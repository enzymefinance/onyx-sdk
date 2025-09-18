import type { Address } from "viem";
import { isVersion, Version } from "../contracts.js";
import { Environment, EnvironmentGroup } from "../environment.js";
import type { Network, NetworkSlug } from "../networks.js";
import { getNetwork, isNetworkIdentifier } from "../networks.js";
import type { DeploymentDefinition, Release } from "../releases.js";
import { Deployment, isDeployment, Kind } from "../releases.js";
import { isNonZeroAddress } from "../utils.js";
import arbitrum from "./arbitrum.js";
import base from "./base.js";
import ethereum from "./ethereum.js";

export const deployments = {
  [Deployment.ARBITRUM]: arbitrum,
  [Deployment.BASE]: base,
  [Deployment.ETHEREUM]: ethereum,
} as const;

export function getEnvironmentGroup(deployment: Deployment) {
  return new EnvironmentGroup(deployments[deployment]);
}

export function getEnvironmentForRelease(release: Release) {
  const [deployment, version] = release.split(".");

  if (isDeployment(deployment) && isVersion(version)) {
    return getEnvironment(deployment, version);
  }

  throw new Error(`Unknown release ${release}`);
}

export function getEnvironment<TVersion extends Version = Version.ONE, TDeployment extends Deployment = Deployment>(
  deployment: TDeployment,
  version?: TVersion,
): Environment<TVersion, TDeployment>;
export function getEnvironment<TVersion extends Version = Version.ONE>(
  network: Network | NetworkSlug,
  version?: TVersion,
): Environment<TVersion>;
export function getEnvironment<TDeployment extends Deployment = Deployment>(
  deployment: TDeployment,
  address?: Address,
): Environment<Version, TDeployment>;
export function getEnvironment(network: Network | NetworkSlug, address?: Address): Environment;

export function getEnvironment(
  deploymentOrNetwork: Deployment | Network | NetworkSlug,
  versionOrAddress: Address | Version = Version.ONE,
): Environment {
  let deployment: DeploymentDefinition<Deployment>;

  if (isDeployment(deploymentOrNetwork)) {
    deployment = deployments[deploymentOrNetwork];
  } else if (isNetworkIdentifier(deploymentOrNetwork)) {
    const network = getNetwork(deploymentOrNetwork as Network);
    const candidates = Object.values(deployments).filter((item) => item.kind === Kind.LIVE);
    const found = candidates.find((item) => item.network === network.id);

    if (!found) {
      throw new Error(`Failed to find deployment for network ${network.slug}`);
    }

    deployment = found;
  } else {
    throw new Error(`Failed to find deployment ${deploymentOrNetwork}`);
  }

  if (isVersion(versionOrAddress)) {
    const release = deployment.releases[versionOrAddress];

    if (release) {
      return new Environment(deployment, release.version);
    }
  } else if (isNonZeroAddress(versionOrAddress)) {
    const candidates = Object.values(deployment.releases);
    const version = candidates.find((item) => item.contracts.GlobalProxy === versionOrAddress)?.version;

    if (version !== undefined) {
      return new Environment(deployment, version);
    }
  }

  throw new Error(`Failed to find ${versionOrAddress} release on deployment ${deployment.slug}`);
}

/**
 * @deprecated Use the `getEnvironment` function.
 */
export const getOfficialEnvironment = getEnvironment;
