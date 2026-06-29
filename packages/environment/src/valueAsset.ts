import type { Hex } from "viem";
import { hexToString, stringToHex } from "viem";

export const ValueAsset = {
  USD: "USD",
  ETH: "ETH",
  BTC: "BTC",
  EUR: "EUR",
  GRT: "GRT",
  tBTC: "tBTC",
  XAUt: "XAUt",
  UNKNOWN: "UNKNOWN",
} as const;

export type ValueAssetType = (typeof ValueAsset)[keyof typeof ValueAsset];

// Note that values quotes in the value asset are always 18 decimals
// The display decimals property is only intended for truncated unneeded decimals for display purposes
export const valueAssetInfo: Record<ValueAssetType, { displayDecimals: number; symbol: ValueAssetType }> = {
  USD: {
    displayDecimals: 4,
    symbol: "USD",
  },
  ETH: {
    displayDecimals: 6,
    symbol: "ETH",
  },
  BTC: {
    displayDecimals: 6,
    symbol: "BTC",
  },
  EUR: {
    displayDecimals: 4,
    symbol: "EUR",
  },
  GRT: {
    displayDecimals: 6,
    symbol: "GRT",
  },
  tBTC: {
    displayDecimals: 6,
    symbol: "tBTC",
  },
  XAUt: {
    displayDecimals: 6,
    symbol: "XAUt",
  },
  UNKNOWN: {
    displayDecimals: 6,
    symbol: "UNKNOWN",
  },
} as const;

export type ValueAssetInfoType = (typeof valueAssetInfo)[keyof typeof valueAssetInfo];

export const valueAssetBytes32: { readonly [T in ValueAssetType]: Hex } = {
  [ValueAsset.USD]: stringToHex("USD", { size: 32 }),
  [ValueAsset.ETH]: stringToHex("ETH", { size: 32 }),
  [ValueAsset.BTC]: stringToHex("BTC", { size: 32 }),
  [ValueAsset.EUR]: stringToHex("EUR", { size: 32 }),
  [ValueAsset.GRT]: stringToHex("GRT", { size: 32 }),
  [ValueAsset.tBTC]: stringToHex("tBTC", { size: 32 }),
  [ValueAsset.XAUt]: stringToHex("XAUt", { size: 32 }),
  [ValueAsset.UNKNOWN]: stringToHex("UNKNOWN", { size: 32 }),
};

export function decodeValueAsset(bytes32: Hex): ValueAssetType {
  const label = hexToString(bytes32, { size: 32 });
  if (label in ValueAsset) {
    return label as ValueAssetType;
  }

  // Fallback to unknown
  return ValueAsset.UNKNOWN;
}

export function encodeValueAsset(valueAsset: ValueAssetType): Hex {
  return valueAssetBytes32[valueAsset];
}
