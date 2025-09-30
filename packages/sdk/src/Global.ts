//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

import { GlobalAbi } from "@enzymefinance/onyx-abis";
import { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils";

export function transferOwnership(args: { globalAddress: Address; newOwner: Address }) {
  return new Viem.PopulatedTransaction({
    abi: GlobalAbi,
    functionName: "transferOwnership",
    address: args.globalAddress,
    args: [args.newOwner],
  });
}

export function acceptOwnership(args: { globalAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: GlobalAbi,
    functionName: "acceptOwnership",
    address: args.globalAddress,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    globalAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: GlobalAbi,
    functionName: "owner",
    address: args.globalAddress,
  });
}

export function getPendingOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    globalAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: GlobalAbi,
    functionName: "pendingOwner",
    address: args.globalAddress,
  });
}
