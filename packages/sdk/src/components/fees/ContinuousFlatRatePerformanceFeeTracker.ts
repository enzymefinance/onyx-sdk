import { ContinuousFlatRatePerformanceFeeTrackerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Configuration

export function setRate(args: { tracker: Address; feeBps: number }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "setRate",
    address: args.tracker,
    args: [args.feeBps],
  });
}

export function resetHighWaterMark(args: { tracker: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "resetHighWaterMark",
    address: args.tracker,
  });
}

export function setHurdleRate(args: { tracker: Address; hurdleRate: number }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "setHurdleRate",
    address: args.tracker,
    args: [args.hurdleRate],
  });
}

export function adjustHighWaterMark(args: { tracker: Address; highWaterMark: bigint; timestamp: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "adjustHighWaterMark",
    address: args.tracker,
    args: [args.highWaterMark, args.timestamp],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    tracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "getRate",
    address: args.tracker,
  });
}
export function getHighWaterMark(
  client: Client,
  args: Viem.ContractCallParameters<{
    tracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "getHighWaterMark",
    address: args.tracker,
  });
}

export function getHighWaterMarkTimestamp(
  client: Client,
  args: Viem.ContractCallParameters<{
    tracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "getHighWaterMarkTimestamp",
    address: args.tracker,
  });
}

export function getHurdleRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    tracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ContinuousFlatRatePerformanceFeeTrackerAbi,
    functionName: "getHurdleRate",
    address: args.tracker,
  });
}
