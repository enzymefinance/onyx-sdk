import { OwnableAddressListAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils";

export function addToList(args: { listAddress: Address; addresses: readonly Address[] }) {
  return new Viem.PopulatedTransaction({
    abi: OwnableAddressListAbi,
    functionName: "addToList",
    address: args.listAddress,
    args: [args.addresses],
  });
}

export function removeFromList(args: { listAddress: Address; addresses: readonly Address[] }) {
  return new Viem.PopulatedTransaction({
    abi: OwnableAddressListAbi,
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
    abi: OwnableAddressListAbi,
    functionName: "isInList",
    address: args.listAddress,
    args: [args.address],
  });
}

export function owner(
  client: Client,
  args: Viem.ContractCallParameters<{
    listAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: OwnableAddressListAbi,
    functionName: "owner",
    address: args.listAddress,
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
    abi: OwnableAddressListAbi,
    functionName: "isAuth",
    address: args.listAddress,
    args: [args.who],
  });
}
