import { SHARES_UNIT } from "../Constants.js";

export function calculateNetAssetValue({ totalSupply, sharePrice }: { sharePrice: bigint; totalSupply: bigint }) {
  return (sharePrice * totalSupply) / SHARES_UNIT;
}
