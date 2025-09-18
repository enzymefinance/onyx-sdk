import { VALUE_ASSET_UNIT } from "../Constants";

export function absoluteValue(value: bigint) {
  return value < 0n ? -value : value;
}

// Helper to multiply a value by a value-asset (18 decimals) rate
export function multiplyByValueAssetRate(value: bigint, rate: bigint) {
  return (value * rate) / VALUE_ASSET_UNIT;
}
