import type { Address } from "viem";
import { isVersion, Version } from "../contracts.js";
import { Environment, EnvironmentGroup } from "../environment.js";
import type { Network, NetworkSlug, SlugByNetwork } from "../networks.js";
import { getNetwork, isNetworkIdentifier } from "../networks.js";
import type { DeploymentDefinition, DeploymentTypeWithRelease, NetworkWithRelease, Release } from "../releases.js";
import { Deployment, type DeploymentType, isDeployment, isDeploymentWithRelease } from "../releases.js";
import { isNonZeroAddress } from "../utils.js";
import arbitrum from "./arbitrum.js";
import base from "./base.js";
import baseSepolia from "./base-sepolia.js";
import ethereum from "./ethereum.js";
import megaeth from "./megaeth.js";
import plume from "./plume.js";
import rayls from "./rayls.js";
import sepolia from "./sepolia.js";

export const deployments = {
  [Deployment.ARBITRUM]: arbitrum,
  [Deployment.BASE]: base,
  [Deployment.BASE_SEPOLIA]: baseSepolia,
  [Deployment.ETHEREUM]: ethereum,
  [Deployment.MEGAETH]: megaeth,
  [Deployment.PLUME]: plume,
  [Deployment.RAYLS]: rayls,
  [Deployment.SEPOLIA]: sepolia,
} as const;

export function getEnvironmentGroup(deployment: DeploymentType) {
  return new EnvironmentGroup(deployments[deployment]);
}

export function getEnvironmentForRelease(release: Release) {
  const [deployment, version] = release.split(".");

  if (isDeploymentWithRelease(deployment) && isVersion(version)) {
    return getEnvironment(deployment, version);
  }

  throw new Error(`Unknown release ${release}`);
}

export function getEnvironment<
  TVersion extends Version = Version.ONE,
  TDeployment extends DeploymentTypeWithRelease = DeploymentTypeWithRelease,
>(deployment: TDeployment, version?: TVersion): Environment<TVersion, TDeployment>;
export function getEnvironment<TVersion extends Version = Version.ONE>(
  network: NetworkWithRelease | SlugByNetwork<NetworkWithRelease>,
  version?: TVersion,
): Environment<TVersion>;
export function getEnvironment<TDeployment extends DeploymentTypeWithRelease = DeploymentTypeWithRelease>(
  deployment: TDeployment,
  address?: Address,
): Environment<Version, TDeployment>;
export function getEnvironment(
  network: NetworkWithRelease | SlugByNetwork<NetworkWithRelease>,
  address?: Address,
): Environment;

export function getEnvironment(
  deploymentOrNetwork: DeploymentType | Network | NetworkSlug,
  versionOrAddress: Address | Version = Version.ONE,
): Environment {
  let deployment: DeploymentDefinition<DeploymentType>;

  if (isDeployment(deploymentOrNetwork)) {
    deployment = deployments[deploymentOrNetwork];
  } else if (isNetworkIdentifier(deploymentOrNetwork)) {
    const network = getNetwork(deploymentOrNetwork as Network);
    const found = Object.values(deployments).find((item) => item.network === network.id);

    if (!found) {
      throw new Error(`Failed to find deployment for network ${network.slug}`);
    }

    deployment = found;
  } else {
    throw new Error(`Failed to find deployment ${deploymentOrNetwork}`);
  }

  if (isVersion(versionOrAddress)) {
    const release = deployment.releases?.[versionOrAddress];

    if (release) {
      return new Environment(deployment, release.version);
    }
  } else if (isNonZeroAddress(versionOrAddress)) {
    const candidates = Object.values(deployment.releases ?? {});
    const version = candidates.find((item) => item.contracts.GlobalProxy === versionOrAddress)?.version;

    if (version !== undefined) {
      return new Environment(deployment, version);
    }
  }

  throw new Error(`Failed to find ${versionOrAddress} release on deployment ${deployment.slug}`);
}
