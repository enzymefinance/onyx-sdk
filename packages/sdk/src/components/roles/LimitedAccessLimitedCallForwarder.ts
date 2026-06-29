import { LimitedAccessLimitedCallForwarderAbi } from "@enzymefinance/onyx-abis";
import {
  type Abi,
  type Address,
  type Client,
  encodeAbiParameters,
  encodeFunctionData,
  getAbiItem,
  type Hex,
} from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

export type Call = { target: Address; data: Hex; value: bigint };

export const executeCallsAbiParameter = getAbiItem({
  abi: LimitedAccessLimitedCallForwarderAbi,
  name: "executeCalls",
});

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

export function executeCalls(args: { forwarderAddress: Address; calls: Call[]; value?: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: LimitedAccessLimitedCallForwarderAbi,
    functionName: "executeCalls",
    address: args.forwarderAddress,
    args: [args.calls],
    value: args.value ?? 0n,
  });
}

export function wrapTransaction(args: { forwarderAddress: Address; tx: Viem.PopulatedTransaction<Abi> }) {
  const callData = encodeFunctionData(args.tx.params);
  return executeCalls({
    forwarderAddress: args.forwarderAddress,
    calls: [{ target: args.tx.params.address, data: callData, value: args.tx.params.value ?? 0n }],
  });
}

export function encodeAbiItemExecuteCalls(calls: Call[]) {
  const abiItem = executeCallsAbiParameter;

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
