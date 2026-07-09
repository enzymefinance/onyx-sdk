import { DepositorWalletAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

// Returns the exact CCIP message and fee the WalletsManager computes when bridging the wallet's
// full token balances back to its source chain (`batchSendTokensViaCCIP` calls this with
// `_feeToken: address(0)` and pays each send `{value: fee}`).
export function buildTokenReturnMessage(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositorWalletAddress: Address;
    tokens: readonly Address[];
    extraArgs: Hex;
    feeToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DepositorWalletAbi,
    functionName: "buildTokenReturnMessage",
    address: args.depositorWalletAddress,
    args: [args.tokens, args.extraArgs, args.feeToken],
  });
}
