export const a = 1;

import { ERC7540LikeDepositQueueAbi } from "@onyx/abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - DEPOSITOR
//--------------------------------------------------------------------------------------------

export function requestDeposit(args: { queueAddress: Address; amount: bigint; controller: Address; owner: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "requestDeposit",
    address: args.queueAddress,
    args: [args.amount, args.controller, args.owner],
  });
}

export function requestDepositReferred(args: {
  queueAddress: Address;
  amount: bigint;
  controller: Address;
  owner: Address;
  referrer: Hex;
}) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "requestDepositReferred",
    address: args.queueAddress,
    args: [args.amount, args.controller, args.owner, args.referrer],
  });
}

export function cancelDeposit(args: { queueAddress: Address; requestId: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "cancelDeposit",
    address: args.queueAddress,
    args: [args.requestId],
  });
}

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - ADMINISTRATOR
//--------------------------------------------------------------------------------------------

export function setAsset(args: { queueAddress: Address; assetAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "setAsset",
    address: args.queueAddress,
    args: [args.assetAddress],
  });
}

export function setDepositMinRequestDuration(args: { queueAddress: Address; duration: number }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "setDepositMinRequestDuration",
    address: args.queueAddress,
    args: [args.duration],
  });
}

export function executeDepositRequests(args: { queueAddress: Address; requestIds: ReadonlyArray<bigint> }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "executeDepositRequests",
    address: args.queueAddress,
    args: [args.requestIds],
  });
}

// Shares holding

export function addAllowedController(args: { queueAddress: Address; allowedControllerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "addAllowedController",
    args: [args.allowedControllerAddress],
    address: args.queueAddress,
  });
}

export function removeAllowedController(args: { queueAddress: Address; allowedControllerAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "removeAllowedController",
    args: [args.allowedControllerAddress],
    address: args.queueAddress,
  });
}

export const DepositRestriction = {
  None: 0,
  ControllerAllowlist: 1,
} as const;
export type DepositRestriction = (typeof DepositRestriction)[keyof typeof DepositRestriction];

export function setDepositRestriction(args: { queueAddress: Address; depositRestriction: DepositRestriction }) {
  return new Viem.PopulatedTransaction({
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "setDepositRestriction",
    args: [args.depositRestriction],
    address: args.queueAddress,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getDepositMinRequestDuration(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "getDepositMinRequestDuration",
    address: args.queueAddress,
  });
}

export function getDepositLastId(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "getDepositLastId",
    address: args.queueAddress,
  });
}

export function getDepositRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
    requestId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "getDepositRequest",
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
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "asset",
    address: args.queueAddress,
  });
}

export function getDepositRestriction(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "getDepositRestriction",
    address: args.queueAddress,
  });
}

export function isInAllowedControllerList(
  client: Client,
  args: Viem.ContractCallParameters<{
    queueAddress: Address;
    controllerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ERC7540LikeDepositQueueAbi,
    functionName: "isInAllowedControllerList",
    address: args.queueAddress,
    args: [args.controllerAddress],
  });
}
