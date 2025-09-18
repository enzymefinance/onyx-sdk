import { SharesAbi } from "@onyx/abis";
import type { ValueAssetType } from "@onyx/environment";
import { encodeValueAsset } from "@onyx/environment";
import type { Address, Client, Hex } from "viem";
import { encodeFunctionData } from "viem";
import { readContract } from "viem/actions";
import { deployProxy } from "./factories/BeaconFactory";
import { Viem } from "./Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Deploy

export type DeploySharesProxyParams = {
  sharesFactoryAddress: Address;
  owner: Address;
  name: string;
  symbol: string;
  valueAsset: ValueAssetType;
};

export function deployShares(args: DeploySharesProxyParams) {
  const initData = encodeFunctionData({
    abi: SharesAbi,
    functionName: "init",
    args: [args.owner, args.name, args.symbol, encodeValueAsset(args.valueAsset)],
  });

  return deployProxy({
    factoryAddress: args.sharesFactoryAddress,
    initData,
  });
}

// Contract admins

export function addAdmin(args: { sharesAddress: Address; admin: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "addAdmin",
    args: [args.admin],
    address: args.sharesAddress,
  });
}

export function removeAdmin(args: { sharesAddress: Address; admin: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "removeAdmin",
    args: [args.admin],
    address: args.sharesAddress,
  });
}

// Share Value Handler

export function setValuationHandler(args: { sharesAddress: Address; valuationHandlerAddress: Hex }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "setValuationHandler",
    address: args.sharesAddress,
    args: [args.valuationHandlerAddress],
  });
}

// Fee Handler

export function setFeeHandler(args: { sharesAddress: Address; feeHandlerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "setFeeHandler",
    args: [args.feeHandlerAddress],
    address: args.sharesAddress,
  });
}

// Shares Issuance

export function addDepositHandler(args: { sharesAddress: Address; depositHandlerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "addDepositHandler",
    args: [args.depositHandlerAddress],
    address: args.sharesAddress,
  });
}

export function removeDepositHandler(args: { sharesAddress: Address; depositHandlerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "removeDepositHandler",
    args: [args.depositHandlerAddress],
    address: args.sharesAddress,
  });
}

export function addRedeemHandler(args: { sharesAddress: Address; redeemHandlerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "addRedeemHandler",
    args: [args.redeemHandlerAddress],
    address: args.sharesAddress,
  });
}

export function removeRedeemHandler(args: { sharesAddress: Address; redeemHandlerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "removeRedeemHandler",
    args: [args.redeemHandlerAddress],
    address: args.sharesAddress,
  });
}

export function setSharesTransferValidator(args: { sharesAddress: Address; validatorAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "setSharesTransferValidator",
    args: [args.validatorAddress],
    address: args.sharesAddress,
  });
}

// ERC20

export function approve(args: { sharesAddress: Address; spender: Address; amount: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "approve",
    address: args.sharesAddress,
    args: [args.spender, args.amount],
  });
}

export function transfer(args: { sharesAddress: Address; to: Address; amount: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "transfer",
    address: args.sharesAddress,
    args: [args.to, args.amount],
  });
}

export function transferFrom(args: { sharesAddress: Address; from: Address; to: Address; amount: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "transferFrom",
    address: args.sharesAddress,
    args: [args.from, args.to, args.amount],
  });
}

export function authTransferFrom(args: { sharesAddress: Address; from: Address; to: Address; amount: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "authTransferFrom",
    address: args.sharesAddress,
    args: [args.from, args.to, args.amount],
  });
}

// Withdraw

export function withdrawAssetTo(args: { sharesAddress: Address; assetAddress: Address; amount: bigint; to: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SharesAbi,
    functionName: "withdrawAssetTo",
    args: [args.assetAddress, args.to, args.amount],
    address: args.sharesAddress,
  });
}
//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function sharePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "sharePrice",
    address: args.sharesAddress,
  });
}

export function getFeeHandler(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "getFeeHandler",
    address: args.sharesAddress,
  });
}

export function getSharesTransferValidator(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "getSharesTransferValidator",
    address: args.sharesAddress,
  });
}

export function getValueAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "getValueAsset",
    address: args.sharesAddress,
  });
}

export function isAdmin(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
    userAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "isAdmin",
    address: args.sharesAddress,
    args: [args.userAddress],
  });
}

// ERC20

export function totalSupply(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "totalSupply",
    address: args.sharesAddress,
  });
}

export function balanceOf(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
    userAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "balanceOf",
    address: args.sharesAddress,
    args: [args.userAddress],
  });
}

export function allowance(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharesAddress: Address;
    owner: Address;
    spender: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SharesAbi,
    functionName: "allowance",
    address: args.sharesAddress,
    args: [args.owner, args.spender],
  });
}
