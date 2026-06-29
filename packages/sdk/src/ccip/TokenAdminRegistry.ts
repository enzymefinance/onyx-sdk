import { TokenAdminRegistryAbi, TokenPoolAbi } from "@enzymefinance/onyx-abis";
import { type Address, type Client, decodeAbiParameters, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export type RemoteTokenResult =
  | { status: "ok"; remoteToken: Address; pool: Address }
  | { status: "no-pool" }
  | { status: "no-remote"; pool: Address };

/**
 * Resolves the source-chain ERC20 address for a given vault-chain asset and source chain
 * selector via Chainlink CCIP's on-chain registry.
 *
 * Runs on the vault (destination) chain. Two `view` reads:
 *   1. `TokenAdminRegistry.getPool(asset)` — `0x0` if the asset has no registered pool.
 *   2. `TokenPool.getRemoteToken(sourceChainSelector)` — empty/`0x0` if no lane to the source.
 *
 * `getRemoteToken` returns `bytes` (ABI-encoded address to support non-EVM chains); decoded
 * as `address` here.
 */
export async function getRemoteToken(
  client: Client,
  args: Viem.ContractCallParameters<{
    tokenAdminRegistry: Address;
    asset: Address;
    sourceChainSelector: bigint;
  }>,
): Promise<RemoteTokenResult> {
  const pool = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: TokenAdminRegistryAbi,
    functionName: "getPool",
    address: args.tokenAdminRegistry,
    args: [args.asset],
  });

  if (pool === zeroAddress) {
    return { status: "no-pool" };
  }

  const encoded = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: TokenPoolAbi,
    functionName: "getRemoteToken",
    address: pool,
    args: [args.sourceChainSelector],
  });

  if (encoded === "0x" || encoded.length === 0) {
    return { status: "no-remote", pool };
  }

  const [remoteToken] = decodeAbiParameters([{ type: "address" }], encoded);

  if (remoteToken === zeroAddress) {
    return { status: "no-remote", pool };
  }

  return { status: "ok", remoteToken, pool };
}
