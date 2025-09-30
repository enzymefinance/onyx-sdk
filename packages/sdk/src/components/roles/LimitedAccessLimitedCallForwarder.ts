import { LimitedAccessLimitedCallForwarderAbi } from "@enzymefinance/onyx-abis";
import { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addUser(args: { forwarderAddress: Address; userAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "addUser",
    address: args.forwarderAddress,
    args: [args.userAddress],
  });
}

export function removeUser(args: { forwarderAddress: Address; userAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "removeUser",
    address: args.forwarderAddress,
    args: [args.userAddress],
  });
}

export function addCall(args: { forwarderAddress: Address; target: Address; selector: Hex }) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "addCall",
    address: args.forwarderAddress,
    args: [args.target, args.selector],
  });
}

export function removeCall(args: { forwarderAddress: Address; target: Address; selector: Hex }) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "removeCall",
    address: args.forwarderAddress,
    args: [args.target, args.selector],
  });
}

export function executeCall(args: {
  forwarderAddress: Address;
  calls: { target: Address; data: Hex; value: bigint }[];
}) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "executeCalls",
    address: args.forwarderAddress,
    args: [args.calls],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function canCall(
  client: Client,
  args: Viem.ContractCallParameters<{
    forwarderAddress: Address;
    target: Address;
    selector: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "canCall",
    address: args.forwarderAddress,
    args: [args.target, args.selector],
  });
}
