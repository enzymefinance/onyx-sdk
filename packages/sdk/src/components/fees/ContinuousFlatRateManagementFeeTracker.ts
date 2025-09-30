import { ContinuousFlatRateManagementFeeTrackerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Configuration

export function setRate(args: { tracker: Address; feeBps: number }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRateManagementFeeTrackerAbi,
    functionName: "setRate",
    address: args.tracker,
    args: [args.feeBps],
  });
}

export function resetLastSettled(args: { tracker: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ContinuousFlatRateManagementFeeTrackerAbi,
    functionName: "resetLastSettled",
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
    abi: ContinuousFlatRateManagementFeeTrackerAbi,
    functionName: "getRate",
    address: args.tracker,
  });
}
export function getLastSettled(
  client: Client,
  args: Viem.ContractCallParameters<{
    tracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ContinuousFlatRateManagementFeeTrackerAbi,
    functionName: "getLastSettled",
    address: args.tracker,
  });
}
