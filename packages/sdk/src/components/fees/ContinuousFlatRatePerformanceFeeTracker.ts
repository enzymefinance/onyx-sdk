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
