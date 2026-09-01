import { SharesMintHandlerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

export type MintInput = {
  to: Address;
  sharesAmount: bigint;
};

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - ADMINISTRATOR
//--------------------------------------------------------------------------------------------

export function mint(args: { handlerAddress: Address; inputs: MintInput[] }) {
  return new Viem.PopulatedTransaction({
    abi: SharesMintHandlerAbi,
    functionName: "mint",
    address: args.handlerAddress,
    args: [args.inputs],
  });
}

export function setPreMintHook(args: { handlerAddress: Address; preMintHook: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesMintHandlerAbi,
    functionName: "setPreMintHook",
    address: args.handlerAddress,
    args: [args.preMintHook],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getPreMintHook(
  client: Client,
  args: Viem.ContractCallParameters<{
    handlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesMintHandlerAbi,
    functionName: "getPreMintHook",
    address: args.handlerAddress,
  });
}
