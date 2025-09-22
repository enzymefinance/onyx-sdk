import type { Address } from "viem";

export enum Network {
  ARBITRUM = 42161,
  BASE = 8453,
  ETHEREUM = 1,
}

export enum NetworkSlug {
  ARBITRUM = "arbitrum",
  BASE = "base",
  ETHEREUM = "ethereum",
}

export type SlugByNetwork<TNetwork extends Network> = TNetwork extends Network.ARBITRUM
  ? NetworkSlug.ARBITRUM
  : TNetwork extends Network.BASE
    ? NetworkSlug.BASE
    : TNetwork extends Network.ETHEREUM
      ? NetworkSlug.ETHEREUM
      : never;

export type NetworkBySlug<TNetworkSlug extends NetworkSlug> = TNetworkSlug extends NetworkSlug.ARBITRUM
  ? Network.ARBITRUM
  : TNetworkSlug extends NetworkSlug.BASE
    ? Network.BASE
    : TNetworkSlug extends NetworkSlug.ETHEREUM
      ? Network.ETHEREUM
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
    readonly wrapper: Address;
    readonly nativeToken: {
      id: Address;
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
};

export const networkBySlug: {
  readonly [TNetworkSlug in NetworkSlug]: NetworkBySlug<TNetworkSlug>;
} = {
  [NetworkSlug.ARBITRUM]: Network.ARBITRUM,
  [NetworkSlug.BASE]: Network.BASE,
  [NetworkSlug.ETHEREUM]: Network.ETHEREUM,
};

const arbitrum: NetworkDefinition<Network.ARBITRUM> = {
  currency: {
    wrapper: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
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
    wrapper: "0x4200000000000000000000000000000000000006",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
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

const mainnet: NetworkDefinition<Network.ETHEREUM> = {
  currency: {
    wrapper: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    nativeToken: {
      id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      network: Network.ETHEREUM,
    },
  },
  explorer: {
    label: "Etherscan",
    url: "https://etherscan.io",
  },
  id: Network.ETHEREUM,
  label: "Ethereum",
  slug: NetworkSlug.ETHEREUM,
};

export const networks: {
  readonly [TNetwork in Network]: NetworkDefinition<TNetwork>;
} = {
  [Network.ARBITRUM]: arbitrum,
  [Network.BASE]: base,
  [Network.ETHEREUM]: mainnet,
};
