import { CCIPRouterAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type CCIPTokenAmount = {
  token: Address;
  amount: bigint;
};

export type CCIPMessage = {
  receiver: Hex;
  data: Hex;
  tokenAmounts: readonly CCIPTokenAmount[];
  feeToken: Address;
  extraArgs: Hex;
};

export function ccipSend(args: {
  routerAddress: Address;
  destinationChainSelector: bigint;
  message: CCIPMessage;
  value: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: CCIPRouterAbi,
    functionName: "ccipSend",
    address: args.routerAddress,
    args: [args.destinationChainSelector, args.message],
    value: args.value,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getFee(
  client: Client,
  args: Viem.ContractCallParameters<{
    routerAddress: Address;
    destinationChainSelector: bigint;
    message: CCIPMessage;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: CCIPRouterAbi,
    functionName: "getFee",
    address: args.routerAddress,
    args: [args.destinationChainSelector, args.message],
  });
}
