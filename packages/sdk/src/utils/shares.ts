import { SHARES_UNIT } from "../Constants";

export function calculateNetAssetValue({ totalSupply, netShareValue }: { netShareValue: bigint; totalSupply: bigint }) {
  return (netShareValue * totalSupply) / SHARES_UNIT;
}
