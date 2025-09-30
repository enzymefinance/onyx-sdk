import { LinearCreditDebtTrackerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addItem(args: {
  trackerAddress: Address;
  totalValue: bigint;
  start: number;
  duration: number;
  description: string;
}) {
  return new Viem.PopulatedTransaction({
    abi: LinearCreditDebtTrackerAbi,
    functionName: "addItem",
    address: args.trackerAddress,
    args: [args.totalValue, args.start, args.duration, args.description],
  });
}

export function removeItem(args: { trackerAddress: Address; itemId: number }) {
  return new Viem.PopulatedTransaction({
    abi: LinearCreditDebtTrackerAbi,
    functionName: "removeItem",
    address: args.trackerAddress,
    args: [args.itemId],
  });
}

export function updateSettledValue(args: { trackerAddress: Address; itemId: number; totalSettled: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: LinearCreditDebtTrackerAbi,
    functionName: "updateSettledValue",
    address: args.trackerAddress,
    args: [args.itemId, args.totalSettled],
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
    abi: LinearCreditDebtTrackerAbi,
    functionName: "getPositionValue",
    address: args.trackerAddress,
  });
}

export function calcItemValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
    itemId: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LinearCreditDebtTrackerAbi,
    functionName: "calcItemValue",
    address: args.trackerAddress,
    args: [args.itemId],
  });
}

export function getItem(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
    itemId: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LinearCreditDebtTrackerAbi,
    functionName: "getItem",
    address: args.trackerAddress,
    args: [args.itemId],
  });
}

export function getItemIds(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LinearCreditDebtTrackerAbi,
    functionName: "getItemIds",
    address: args.trackerAddress,
  });
}

export function getItemsCount(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LinearCreditDebtTrackerAbi,
    functionName: "getItemsCount",
    address: args.trackerAddress,
  });
}

export function getLastItemId(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LinearCreditDebtTrackerAbi,
    functionName: "getLastItemId",
    address: args.trackerAddress,
  });
}

export async function getPositionValueWithSignedAggregates(
  client: Client,
  args: Viem.ContractCallParameters<{
    trackerAddress: Address;
  }>,
) {
  const ids = await getItemIds(client, args);

  let sumOfPositiveValues = 0n;
  let sumOfNegativeValues = 0n;

  const itemValues = await Promise.all(ids.map((id) => calcItemValue(client, { ...args, itemId: id })));

  for (const itemValue of itemValues) {
    if (itemValue >= 0n) {
      sumOfPositiveValues += itemValue;
    } else {
      sumOfNegativeValues += itemValue;
    }
  }
  return {
    sumOfPositiveValues,
    sumOfNegativeValues,
    totalValue: sumOfPositiveValues + sumOfNegativeValues,
  };
}
