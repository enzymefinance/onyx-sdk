import { FeeHandlerAbi } from "@onyx/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Configuration

export function setEntranceFee(args: { feeHandlerAddress: Address; feeBps: number; recipient: Address }) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "setEntranceFee",
    address: args.feeHandlerAddress,
    args: [args.feeBps, args.recipient],
  });
}

export function setExitFee(args: { feeHandlerAddress: Address; feeBps: number; recipient: Address }) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "setExitFee",
    address: args.feeHandlerAddress,
    args: [args.feeBps, args.recipient],
  });
}

export function setFeeAsset(args: { feeHandlerAddress: Address; asset: Address }) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "setFeeAsset",
    address: args.feeHandlerAddress,
    args: [args.asset],
  });
}

export function setManagementFee(args: {
  feeHandlerAddress: Address;
  managementFeeTracker: Address;
  recipient: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "setManagementFee",
    address: args.feeHandlerAddress,
    args: [args.managementFeeTracker, args.recipient],
  });
}

export function setPerformanceFee(args: {
  feeHandlerAddress: Address;
  performanceFeeTracker: Address;
  recipient: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "setPerformanceFee",
    address: args.feeHandlerAddress,
    args: [args.performanceFeeTracker, args.recipient],
  });
}

// Claim

export function claimFees(args: { feeHandlerAddress: Address; onBehalf: Address; value: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: FeeHandlerAbi,
    functionName: "claimFees",
    address: args.feeHandlerAddress,
    args: [args.onBehalf, args.value],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getEntranceFeeBps(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getEntranceFeeBps",
    address: args.feeHandlerAddress,
  });
}

export function getEntranceFeeRecipient(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getEntranceFeeRecipient",
    address: args.feeHandlerAddress,
  });
}

export function getExitFeeBps(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getExitFeeBps",
    address: args.feeHandlerAddress,
  });
}

export function getExitFeeRecipient(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getExitFeeRecipient",
    address: args.feeHandlerAddress,
  });
}

export function getFeeAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getFeeAsset",
    address: args.feeHandlerAddress,
  });
}

export function getManagementFeeRecipient(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getManagementFeeRecipient",
    address: args.feeHandlerAddress,
  });
}

export function getManagementFeeTracker(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getManagementFeeTracker",
    address: args.feeHandlerAddress,
  });
}

export function getPerformanceFeeRecipient(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getPerformanceFeeRecipient",
    address: args.feeHandlerAddress,
  });
}

export function getPerformanceFeeTracker(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getPerformanceFeeTracker",
    address: args.feeHandlerAddress,
  });
}

export function getTotalValueOwed(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getTotalValueOwed",
    address: args.feeHandlerAddress,
  });
}

export function getValueOwedToUser(
  client: Client,
  args: Viem.ContractCallParameters<{
    feeHandlerAddress: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: FeeHandlerAbi,
    functionName: "getValueOwedToUser",
    address: args.feeHandlerAddress,
    args: [args.user],
  });
}
