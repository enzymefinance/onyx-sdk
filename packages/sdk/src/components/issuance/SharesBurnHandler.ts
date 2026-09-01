import { SharesBurnHandlerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

export type BurnInput = {
  from: Address;
  sharesAmount: bigint;
};

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - ADMINISTRATOR
//--------------------------------------------------------------------------------------------

export function burn(args: { handlerAddress: Address; inputs: BurnInput[] }) {
  return new Viem.PopulatedTransaction({
    abi: SharesBurnHandlerAbi,
    functionName: "burn",
    address: args.handlerAddress,
    args: [args.inputs],
  });
}

export function setPreBurnHook(args: { handlerAddress: Address; preBurnHook: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesBurnHandlerAbi,
    functionName: "setPreBurnHook",
    address: args.handlerAddress,
    args: [args.preBurnHook],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getPreBurnHook(
  client: Client,
  args: Viem.ContractCallParameters<{
    handlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesBurnHandlerAbi,
    functionName: "getPreBurnHook",
    address: args.handlerAddress,
  });
}
