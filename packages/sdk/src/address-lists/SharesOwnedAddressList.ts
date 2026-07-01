import { SharesOwnedAddressListAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils";

export function addToList(args: { listAddress: Address; addresses: readonly Address[] }) {
  return new Viem.PopulatedTransaction({
    abi: SharesOwnedAddressListAbi,
    functionName: "addToList",
    address: args.listAddress,
    args: [args.addresses],
  });
}

export function removeFromList(args: { listAddress: Address; addresses: readonly Address[] }) {
  return new Viem.PopulatedTransaction({
    abi: SharesOwnedAddressListAbi,
    functionName: "removeFromList",
    address: args.listAddress,
    args: [args.addresses],
  });
}

export function isInList(
  client: Client,
  args: Viem.ContractCallParameters<{
    listAddress: Address;
    address: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesOwnedAddressListAbi,
    functionName: "isInList",
    address: args.listAddress,
    args: [args.address],
  });
}

export function isAuth(
  client: Client,
  args: Viem.ContractCallParameters<{
    listAddress: Address;
    who: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesOwnedAddressListAbi,
    functionName: "isAuth",
    address: args.listAddress,
    args: [args.who],
  });
}
