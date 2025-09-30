import { ValuationHandlerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addPositionTracker(args: { valuationHandlerAddress: Address; positionTrackerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ValuationHandlerAbi,
    functionName: "addPositionTracker",
    address: args.valuationHandlerAddress,
    args: [args.positionTrackerAddress],
  });
}

export function removePositionTracker(args: { valuationHandlerAddress: Address; positionTrackerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ValuationHandlerAbi,
    functionName: "removePositionTracker",
    address: args.valuationHandlerAddress,
    args: [args.positionTrackerAddress],
  });
}

interface AssetRateInput {
  asset: Address;
  rate: bigint;
  expiry: number;
}

export function setAssetRate(args: { valuationHandlerAddress: Address; assetRateInput: AssetRateInput }) {
  return new Viem.PopulatedTransaction({
    abi: ValuationHandlerAbi,
    functionName: "setAssetRate",
    address: args.valuationHandlerAddress,
    args: [{ asset: args.assetRateInput.asset, rate: args.assetRateInput.rate, expiry: args.assetRateInput.expiry }],
  });
}

export function setAssetRatesThenUpdateShareValue(args: {
  valuationHandlerAddress: Address;
  assetRateInput: ReadonlyArray<AssetRateInput>;
  untrackedPositionsValue: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: ValuationHandlerAbi,
    functionName: "setAssetRatesThenUpdateShareValue",
    address: args.valuationHandlerAddress,
    args: [args.assetRateInput, args.untrackedPositionsValue],
  });
}

export function updateShareValue(args: { valuationHandlerAddress: Address; untrackedPositionsValue: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: ValuationHandlerAbi,
    functionName: "updateShareValue",
    args: [args.untrackedPositionsValue],
    address: args.valuationHandlerAddress,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getAssetRateInfo(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
    assetAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "getAssetRateInfo",
    address: args.valuationHandlerAddress,
    args: [args.assetAddress],
  });
}

export function getPositionTrackers(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "getPositionTrackers",
    address: args.valuationHandlerAddress,
  });
}

export function isPositionTracker(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
    positionTrackerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "isPositionTracker",
    address: args.valuationHandlerAddress,
    args: [args.positionTrackerAddress],
  });
}

export function convertAssetAmountToValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
    assetAddress: Address;
    assetAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "convertAssetAmountToValue",
    address: args.valuationHandlerAddress,
    args: [args.assetAddress, args.assetAmount],
  });
}

export function convertValueToAssetAmount(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
    value: bigint;
    assetAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "convertValueToAssetAmount",
    address: args.valuationHandlerAddress,
    args: [args.value, args.assetAddress],
  });
}

export function getDefaultSharePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "getDefaultSharePrice",
    address: args.valuationHandlerAddress,
  });
}

export function getSharePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "getSharePrice",
    address: args.valuationHandlerAddress,
  });
}

export function getShareValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    valuationHandlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ValuationHandlerAbi,
    functionName: "getShareValue",
    address: args.valuationHandlerAddress,
  });
}
