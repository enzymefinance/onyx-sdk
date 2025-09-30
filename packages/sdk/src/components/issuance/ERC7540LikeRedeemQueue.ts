export const a = 1;

import { ERC7540LikeRedeemQueueAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - DEPOSITOR
//--------------------------------------------------------------------------------------------

export function requestRedeem(args: { queueAddress: Address; amount: bigint; controller: Address; owner: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "requestRedeem",
    address: args.queueAddress,
    args: [args.amount, args.controller, args.owner],
  });
}

export function cancelRedeem(args: { queueAddress: Address; requestId: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "cancelRedeem",
    address: args.queueAddress,
    args: [args.requestId],
  });
}

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - ADMINISTRATOR
//--------------------------------------------------------------------------------------------

export function setAsset(args: { queueAddress: Address; assetAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "setAsset",
    address: args.queueAddress,
    args: [args.assetAddress],
  });
}

export function setRedeemMinRequestDuration(args: { queueAddress: Address; duration: number }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "setRedeemMinRequestDuration",
    address: args.queueAddress,
    args: [args.duration],
  });
}

export function executeRedeemRequests(args: { queueAddress: Address; requestIds: ReadonlyArray<bigint> }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "executeRedeemRequests",
    address: args.queueAddress,
    args: [args.requestIds],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getRedeemMinRequestDuration(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "getRedeemMinRequestDuration",
    address: args.queueAddress,
  });
}

export function getRedeemLastId(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "getRedeemLastId",
    address: args.queueAddress,
  });
}

export function getRedeemRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
    requestId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "getRedeemRequest",
    address: args.queueAddress,
    args: [args.requestId],
  });
}

export function getAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeRedeemQueueAbi,
    functionName: "asset",
    address: args.queueAddress,
  });
}
