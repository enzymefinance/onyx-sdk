import { AccountERC20TrackerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addAsset(args: { trackerAddress: Address; asset: Address }) {
  return new Viem.PopulatedTransaction({
    abi: AccountERC20TrackerAbi,
    functionName: "addAsset",
    address: args.trackerAddress,
    args: [args.asset],
  });
}

export function removeAsset(args: { trackerAddress: Address; asset: Address }) {
  return new Viem.PopulatedTransaction({
    abi: AccountERC20TrackerAbi,
    functionName: "removeAsset",
    address: args.trackerAddress,
    args: [args.asset],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getPositionValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: AccountERC20TrackerAbi,
    functionName: "getPositionValue",
    address: args.trackerAddress,
  });
}

export function getAccount(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: AccountERC20TrackerAbi,
    functionName: "getAccount",
    address: args.trackerAddress,
  });
}

export function getAssets(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: AccountERC20TrackerAbi,
    functionName: "getAssets",
    address: args.trackerAddress,
  });
}

export function isAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: AccountERC20TrackerAbi,
    functionName: "isAsset",
    address: args.trackerAddress,
    args: [args.asset],
  });
}
