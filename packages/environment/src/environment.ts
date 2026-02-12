import type { Address } from "viem";
import type { VersionContracts } from "./contracts.js";
import { isVersion, Version } from "./contracts.js";
import type { NetworkDefinition } from "./networks.js";
import { getNetwork } from "./networks.js";
import type { DeploymentDefinition, DeploymentNetwork, ReleaseDefinition } from "./releases.js";
import { Deployment, type DeploymentType } from "./releases.js";
import { isNonZeroAddress } from "./utils.js";

export class EnvironmentGroup<TDeployment extends DeploymentType = DeploymentType> {
  public readonly network: NetworkDefinition<DeploymentNetwork<TDeployment>>;
  private environments: Partial<{
    [TVersion in Version]: Environment<TVersion, TDeployment>;
  }> = {};

  public constructor(public readonly deployment: DeploymentDefinition<TDeployment>) {
    this.network = getNetwork(deployment.network);
  }

  public hasEnvironment(version: Version): boolean;
  public hasEnvironment(address: Address): boolean;
  public hasEnvironment(versionOrAddress: Address | Version): boolean;
  public hasEnvironment(versionOrAddress: Address | Version) {
    if (isVersion(versionOrAddress)) {
      return !!this.deployment.releases[versionOrAddress];
    }

    return !!Object.values(this.deployment.releases).find((item) => item.contracts.GlobalProxy === versionOrAddress);
  }

  public getVersion(address: Address) {
    const release = Object.values(this.deployment.releases).find((item) => item.contracts.GlobalProxy === address);

    if (!release) {
      throw new Error(`Invalid release address ${address} for deployment ${this.deployment.slug}`);
    }

    return release.version;
  }

  public getEnvironment<TVersion extends Version>(version: TVersion): Environment<TVersion>;
  public getEnvironment(address: Address): Environment;
  public getEnvironment(versionOrAddress: Address | Version): Environment;
  public getEnvironment(versionOrAddress: Address | Version) {
    const version = isVersion(versionOrAddress) ? versionOrAddress : this.getVersion(versionOrAddress);

    if (!this.environments[version] && !!this.deployment.releases[version]) {
      // biome-ignore lint/suspicious/noExplicitAny: needs refactoring
      this.environments[version] = new Environment(this.deployment, version) as any;
    }

    if (!this.environments[version]) {
      throw new Error(`Invalid release ${version} for deployment ${this.deployment.slug}`);
    }

    // biome-ignore lint/style/noNonNullAssertion: needs refactoring
    return this.environments[version]!;
  }

  public get one() {
    return this.getEnvironment(Version.ONE);
  }
}

export class Environment<TVersion extends Version = Version, TDeployment extends DeploymentType = DeploymentType> {
  public readonly network: NetworkDefinition<DeploymentNetwork<TDeployment>>;
  public readonly release: ReleaseDefinition<TVersion, TDeployment>;
  public readonly contracts: VersionContracts<TVersion>;

  private static createIsVersion<TVersion extends Version>(version: TVersion) {
    return (environment: Environment): environment is Environment<TVersion> => environment.release.version === version;
  }

  public static isVersionOne = Environment.createIsVersion(Version.ONE);
  public static isVersion<TVersion extends Version>(
    version: TVersion,
    environment: Environment,
  ): environment is Environment<TVersion> {
    return environment.release.version === version;
  }

  private static createIsDeployment<TDeployment extends DeploymentType>(deployment: TDeployment) {
    return (environment: Environment): environment is Environment<Version, TDeployment> =>
      environment.deployment.slug === deployment;
  }

  public static isDeploymentArbitrum = Environment.createIsDeployment(Deployment.ARBITRUM);
  public static isDeploymentBase = Environment.createIsDeployment(Deployment.BASE);
  public static isDeploymentEthereum = Environment.createIsDeployment(Deployment.ETHEREUM);
  public static isDeploymentPlume = Environment.createIsDeployment(Deployment.PLUME);
  public static isDeploymentTestnet = Environment.createIsDeployment(Deployment.TESTNET);
  public static isDeployment<TDeployment extends DeploymentType>(
    deployment: TDeployment,
    environment: Environment,
  ): environment is Environment<Version, TDeployment> {
    return environment.deployment.slug === deployment;
  }

  public constructor(
    public readonly deployment: DeploymentDefinition<TDeployment>,
    public readonly version: TVersion,
  ) {
    const release = this.deployment.releases[version];

    if (!release) {
      throw new Error(`Invalid release ${version} for ${deployment.slug} deployment`);
    }

    const network = deployment.network;

    this.release = release;
    this.contracts = release.contracts;
    this.network = getNetwork(network);
  }

  public hasContract(name: keyof VersionContracts<TVersion>) {
    return isNonZeroAddress(this.contracts[name]);
  }

  public getContract(name: keyof VersionContracts<TVersion>) {
    if (!this.hasContract(name)) {
      throw new Error(`Missing contract ${String(name)}`);
    }

    return this.contracts[name];
  }

  public toJSON() {
    return `${this.deployment.slug}.${this.version}`;
  }

  public toString() {
    return `${this.deployment.slug}.${this.version}`;
  }
}
