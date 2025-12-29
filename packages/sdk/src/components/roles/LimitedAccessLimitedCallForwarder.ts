import { LimitedAccessLimitedCallForwarderAbi } from "@enzymefinance/onyx-abis";
import { Address, Client, encodeAbiParameters, getAbiItem, Hex } from "viem";
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

export function executeCalls(args: {
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

export function encodeAbiItemExecuteCalls(calls: { target: Address; data: Hex; value: bigint }[]) {
  const abiItem = getAbiItem({
    abi: LimitedAccessLimitedCallForwarderAbi,
    name: "executeCalls",
  });

  return encodeAbiParameters(abiItem.inputs, [calls]);
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
