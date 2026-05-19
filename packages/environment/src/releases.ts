import type { VersionContracts } from "./contracts.js";
import { isVersion, Version } from "./contracts.js";
import type { Network } from "./networks.js";

export enum Status {
  LIVE = "live",
  PENDING = "pending",
  DEPRECATED = "deprecated",
}

export const Deployment = {
  ARBITRUM: "arbitrum",
  BASE: "base",
  ETHEREUM: "ethereum",
  MEGAETH: "megaeth",
  PLUME: "plume",
  RAYLS: "rayls",
  SEPOLIA: "sepolia",
} as const;

export type DeploymentType = (typeof Deployment)[keyof typeof Deployment];

export type DeploymentNetwork<TDeployment extends DeploymentType> = TDeployment extends typeof Deployment.ARBITRUM
  ? Network.ARBITRUM
  : TDeployment extends typeof Deployment.BASE
    ? Network.BASE
    : TDeployment extends typeof Deployment.ETHEREUM
      ? Network.ETHEREUM
      : TDeployment extends typeof Deployment.MEGAETH
        ? Network.MEGAETH
        : TDeployment extends typeof Deployment.PLUME
          ? Network.PLUME
          : TDeployment extends typeof Deployment.RAYLS
            ? Network.RAYLS
            : TDeployment extends typeof Deployment.SEPOLIA
              ? Network.SEPOLIA
              : never;

export function isDeployment(value: unknown): value is DeploymentType {
  return typeof value === "string" && Object.values<unknown>(Deployment).includes(value);
}

export function isRelease(value: unknown): value is Release {
  if (typeof value === "string") {
    const [deployment, version] = value.split(".");

    if (isDeployment(deployment) && isVersion(version)) {
      return Object.keys(releases[deployment]).includes(version);
    }
  }

  return false;
}

export interface ReleaseDefinition<TVersion extends Version, TDeployment extends DeploymentType> {
  /**
   * The unique release identifier.
   */
  readonly slug: `${TDeployment}.${TVersion}`;
  /**
   * The network identifier.
   */
  readonly network: DeploymentNetwork<TDeployment>;
  /**
   * The version (e.g. sulu, encore, phoenix) of the release.
   */
  readonly version: TVersion;
  /**
   * The block number at which the fund deployer contract was deployed.
   */
  readonly inception: number;
  /**
   * Mapping of contract names and their addresses within this release.
   */
  readonly contracts: VersionContracts<TVersion, TDeployment>;
  /**
   * The release status (pending, deprecated or live).
   */
  readonly status: Status;
}

export enum Kind {
  TEST = "test",
  LIVE = "live",
}

export interface DeploymentDefinition<TDeployment extends DeploymentType> {
  /**
   * The unique deployment identifier.
   */
  readonly slug: TDeployment;
  /**
   * The network identifier.
   */
  readonly network: DeploymentNetwork<TDeployment>;
  /**
   * The kind of the deployment (e.g. testnet or production).
   */
  readonly kind: Kind;
  /**
   * The human readable name of the deployment.
   */
  readonly label: string;
  /**
   * The block number at which the dispatcher contract was deployed.
   */
  readonly inception: number;
  /**
   * List of releases that belong to this deployment.
   */
  readonly releases: Partial<{
    readonly [TVersion in Version]: ReleaseDefinition<TVersion, TDeployment>;
  }>;
}

export function defineDeployment<TDeployment extends DeploymentType>(deployment: DeploymentDefinition<TDeployment>) {
  return deployment;
}

export type Release = {
  [TDeployment in DeploymentType]: (typeof releases)[TDeployment][keyof (typeof releases)[TDeployment]];
}[DeploymentType];

export const releases = {
  [Deployment.ARBITRUM]: {
    [Version.ONE]: `${Deployment.ARBITRUM}.${Version.ONE}`,
  },
  [Deployment.BASE]: {
    [Version.ONE]: `${Deployment.BASE}.${Version.ONE}`,
  },
  [Deployment.ETHEREUM]: {
    [Version.ONE]: `${Deployment.ETHEREUM}.${Version.ONE}`,
  },
  [Deployment.MEGAETH]: {
    [Version.ONE]: `${Deployment.MEGAETH}.${Version.ONE}`,
  },
  [Deployment.PLUME]: {
    [Version.ONE]: `${Deployment.PLUME}.${Version.ONE}`,
  },
  [Deployment.RAYLS]: {
    [Version.ONE]: `${Deployment.RAYLS}.${Version.ONE}`,
  },
  [Deployment.SEPOLIA]: {
    [Version.ONE]: `${Deployment.SEPOLIA}.${Version.ONE}`,
  },
} as const;
