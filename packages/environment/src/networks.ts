export enum Network {
  ARBITRUM = 42161,
  BASE = 8453,
  ETHEREUM = 1,
  MEGAETH = 4326,
  PLUME = 98866,
  SEPOLIA = 11155111,
}

export enum NetworkSlug {
  ARBITRUM = "arbitrum",
  BASE = "base",
  ETHEREUM = "ethereum",
  MEGAETH = "megaeth",
  PLUME = "plume",
  SEPOLIA = "sepolia",
}

export type SlugByNetwork<TNetwork extends Network> = TNetwork extends Network.ARBITRUM
  ? NetworkSlug.ARBITRUM
  : TNetwork extends Network.BASE
    ? NetworkSlug.BASE
    : TNetwork extends Network.ETHEREUM
      ? NetworkSlug.ETHEREUM
      : TNetwork extends Network.MEGAETH
        ? NetworkSlug.MEGAETH
        : TNetwork extends Network.PLUME
          ? NetworkSlug.PLUME
          : TNetwork extends Network.SEPOLIA
            ? NetworkSlug.SEPOLIA
            : never;

export type NetworkBySlug<TNetworkSlug extends NetworkSlug> = TNetworkSlug extends NetworkSlug.ARBITRUM
  ? Network.ARBITRUM
  : TNetworkSlug extends NetworkSlug.BASE
    ? Network.BASE
    : TNetworkSlug extends NetworkSlug.ETHEREUM
      ? Network.ETHEREUM
      : TNetworkSlug extends NetworkSlug.MEGAETH
        ? Network.MEGAETH
        : TNetworkSlug extends NetworkSlug.PLUME
          ? Network.PLUME
          : TNetworkSlug extends NetworkSlug.SEPOLIA
            ? Network.SEPOLIA
            : never;

export function getNetwork<TNetwork extends Network = Network>(network: TNetwork): NetworkDefinition<TNetwork>;
export function getNetwork<TNetworkSlug extends NetworkSlug = NetworkSlug>(
  slug: TNetworkSlug,
): NetworkDefinition<NetworkBySlug<TNetworkSlug>>;
export function getNetwork(networkOrSlug: Network | NetworkSlug): NetworkDefinition;

export function getNetwork(networkOrSlug: Network | NetworkSlug): NetworkDefinition {
  if (isSupportedNetwork(networkOrSlug)) {
    return networks[networkOrSlug];
  }

  if (isSupportedNetworkSlug(networkOrSlug)) {
    return networks[networkBySlug[networkOrSlug]];
  }

  throw new Error(`Invalid network ${networkOrSlug}`);
}

export function isNetworkIdentifier(value: unknown): value is Network | NetworkSlug {
  return isSupportedNetwork(Number(value)) || isSupportedNetworkSlug(value);
}

export function isSupportedNetworkSlug(value: unknown): value is NetworkSlug {
  return typeof value === "string" && Object.values<unknown>(NetworkSlug).includes(value);
}

export function isSupportedNetwork(value: unknown): value is Network {
  const number = Number(value);

  return !Number.isNaN(number) && Object.values<unknown>(Network).includes(number);
}

export interface NetworkDefinition<TNetwork extends Network = Network> {
  readonly currency: {
    readonly nativeToken: {
      name: string;
      symbol: string;
      decimals: number;
      network: Network;
    };
  };
  readonly explorer: {
    readonly label: string;
    readonly url: string;
  };
  readonly id: TNetwork;
  readonly slug: SlugByNetwork<TNetwork>;
  readonly label: string;
}

export const slugByNetwork: {
  readonly [TNetwork in Network]: SlugByNetwork<TNetwork>;
} = {
  [Network.ARBITRUM]: NetworkSlug.ARBITRUM,
  [Network.BASE]: NetworkSlug.BASE,
  [Network.ETHEREUM]: NetworkSlug.ETHEREUM,
  [Network.MEGAETH]: NetworkSlug.MEGAETH,
  [Network.PLUME]: NetworkSlug.PLUME,
  [Network.SEPOLIA]: NetworkSlug.SEPOLIA,
};

export const networkBySlug: {
  readonly [TNetworkSlug in NetworkSlug]: NetworkBySlug<TNetworkSlug>;
} = {
  [NetworkSlug.ARBITRUM]: Network.ARBITRUM,
  [NetworkSlug.BASE]: Network.BASE,
  [NetworkSlug.ETHEREUM]: Network.ETHEREUM,
  [NetworkSlug.MEGAETH]: Network.MEGAETH,
  [NetworkSlug.PLUME]: Network.PLUME,
  [NetworkSlug.SEPOLIA]: Network.SEPOLIA,
};

const arbitrum: NetworkDefinition<Network.ARBITRUM> = {
  currency: {
    nativeToken: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.ARBITRUM,
    },
  },
  explorer: {
    label: "Arbiscan",
    url: "https://arbiscan.io/",
  },
  id: Network.ARBITRUM,
  label: "Arbitrum",
  slug: NetworkSlug.ARBITRUM,
} as const;

const base: NetworkDefinition<Network.BASE> = {
  currency: {
    nativeToken: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.BASE,
    },
  },
  explorer: {
    label: "BaseScan",
    url: "https://basescan.org/",
  },
  id: Network.BASE,
  label: "Base",
  slug: NetworkSlug.BASE,
};

const megaeth: NetworkDefinition<Network.MEGAETH> = {
  currency: {
    nativeToken: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.MEGAETH,
    },
  },
  explorer: {
    label: "Blockscout",
    url: "https://megaeth.blockscout.com/",
  },
  id: Network.MEGAETH,
  label: "MegaETH",
  slug: NetworkSlug.MEGAETH,
};

const mainnet: NetworkDefinition<Network.ETHEREUM> = {
  currency: {
    nativeToken: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.ETHEREUM,
    },
  },
  explorer: {
    label: "Etherscan",
    url: "https://etherscan.io/",
  },
  id: Network.ETHEREUM,
  label: "Ethereum",
  slug: NetworkSlug.ETHEREUM,
};

const sepolia: NetworkDefinition<Network.SEPOLIA> = {
  currency: {
    nativeToken: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.SEPOLIA,
    },
  },
  explorer: {
    label: "Sepolia Etherscan",
    url: "https://sepolia.etherscan.io/",
  },
  id: Network.SEPOLIA,
  label: "Sepolia",
  slug: NetworkSlug.SEPOLIA,
};

const plume: NetworkDefinition<Network.PLUME> = {
  currency: {
    nativeToken: {
      name: "Plume Token",
      symbol: "PLUME",
      decimals: 18,
      network: Network.PLUME,
    },
  },
  explorer: {
    label: "Plume Explorer",
    url: "https://explorer.plume.org/",
  },
  id: Network.PLUME,
  label: "Plume",
  slug: NetworkSlug.PLUME,
};

export const networks: {
  readonly [TNetwork in Network]: NetworkDefinition<TNetwork>;
} = {
  [Network.ARBITRUM]: arbitrum,
  [Network.BASE]: base,
  [Network.ETHEREUM]: mainnet,
  [Network.MEGAETH]: megaeth,
  [Network.PLUME]: plume,
  [Network.SEPOLIA]: sepolia,
};
