import type { Address } from "viem";
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
  BASE_SEPOLIA: "base-sepolia",
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
    : TDeployment extends typeof Deployment.BASE_SEPOLIA
      ? Network.BASE_SEPOLIA
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

export const DeploymentWithRelease = {
  [Deployment.ARBITRUM]: Deployment.ARBITRUM,
  [Deployment.BASE]: Deployment.BASE,
  [Deployment.ETHEREUM]: Deployment.ETHEREUM,
  [Deployment.MEGAETH]: Deployment.MEGAETH,
  [Deployment.PLUME]: Deployment.PLUME,
  [Deployment.RAYLS]: Deployment.RAYLS,
  [Deployment.SEPOLIA]: Deployment.SEPOLIA,
} as const satisfies { [K in DeploymentTypeWithRelease]: K };

export function isDeploymentWithRelease(value: unknown): value is DeploymentTypeWithRelease {
  return isDeployment(value) && Object.keys(releases[value]).length > 0;
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

type CcipFields = {
  /**
   * The CCIP chain selector for this network.
   */
  readonly ccipChainSelector: bigint;
  /**
   * External contracts (third-party) relevant to this deployment.
   */
  readonly externalContracts: {
    /**
     * The CCIP Router address for this network.
     */
    readonly ccipRouter: Address;
    /**
     * The wrapped native token (WETH/WPLUME/etc.) for this network. Used as the fee token
     * for CCIP return messages so that excess can be refunded via `tokenAmounts`.
     */
    readonly wrappedNative: Address;
    /**
     * The CCIP TokenAdminRegistry address for this network. Used to resolve the source-chain
     * ERC20 address for a given vault-chain asset when bridging deposits via CCIP.
     */
    readonly tokenAdminRegistry: Address;
  };
};

type NoCcipFields = {
  readonly ccipChainSelector?: never;
  readonly externalContracts?: never;
};

type DeploymentCcipFieldsMap = {
  [Deployment.ARBITRUM]: CcipFields;
  [Deployment.BASE]: CcipFields;
  [Deployment.BASE_SEPOLIA]: CcipFields;
  [Deployment.ETHEREUM]: CcipFields;
  [Deployment.MEGAETH]: CcipFields;
  [Deployment.PLUME]: CcipFields;
  [Deployment.SEPOLIA]: CcipFields;
  [Deployment.RAYLS]: NoCcipFields;
};

export type DeploymentCcipFields<TDeployment extends DeploymentType> = DeploymentCcipFieldsMap[TDeployment];

export type ReleasesFields<TDeployment extends DeploymentType = DeploymentType> = {
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
};

type NoReleasesFields = {
  readonly inception?: never;
  readonly releases?: never;
};

/**
 * Per-deployment releases shape. A deployment either has contract releases (and therefore an
 * inception block + release map) or it is CCIP-only (no contracts at all, e.g. Base Sepolia).
 * Encoded as a distributive conditional so the generic relationship between `TDeployment` and
 * the contracts inside `ReleaseDefinition` is preserved (a mapped/lookup type collapses the
 * union and loses the per-deployment narrowing).
 */
export type DeploymentReleases<TDeployment extends DeploymentType> = TDeployment extends typeof Deployment.BASE_SEPOLIA
  ? NoReleasesFields
  : ReleasesFields<TDeployment>;

/**
 * Deployment slugs that have a contract release (i.e. exclude CCIP-only deployments).
 */
export type DeploymentTypeWithRelease = Exclude<DeploymentType, typeof Deployment.BASE_SEPOLIA>;

interface DeploymentDefinitionBase<TDeployment extends DeploymentType> {
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
}

export type DeploymentDefinition<TDeployment extends DeploymentType> = DeploymentDefinitionBase<TDeployment> &
  DeploymentReleases<TDeployment> &
  DeploymentCcipFields<TDeployment>;

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
  [Deployment.BASE_SEPOLIA]: {},
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
