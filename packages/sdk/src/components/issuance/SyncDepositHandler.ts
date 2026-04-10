import { SyncDepositHandlerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - DEPOSITOR
//--------------------------------------------------------------------------------------------

export function deposit(args: { handlerAddress: Address; amount: bigint }) {
  return new Viem.PopulatedTransaction({
    abi: SyncDepositHandlerAbi,
    functionName: "deposit",
    address: args.handlerAddress,
    args: [args.amount],
  });
}

export function depositReferred(args: { handlerAddress: Address; amount: bigint; referrer: Hex }) {
  return new Viem.PopulatedTransaction({
    abi: SyncDepositHandlerAbi,
    functionName: "depositReferred",
    address: args.handlerAddress,
    args: [args.amount, args.referrer],
  });
}

//--------------------------------------------------------------------------------------------
// TRANSACTIONS - ADMINISTRATOR
//--------------------------------------------------------------------------------------------

export function setDepositorAllowlist(args: { handlerAddress: Address; list: Address }) {
  return new Viem.PopulatedTransaction({
    abi: SyncDepositHandlerAbi,
    functionName: "setDepositorAllowlist",
    address: args.handlerAddress,
    args: [args.list],
  });
}

export function setMaxSharePriceStaleness(args: { handlerAddress: Address; maxStaleness: number }) {
  return new Viem.PopulatedTransaction({
    abi: SyncDepositHandlerAbi,
    functionName: "setMaxSharePriceStaleness",
    address: args.handlerAddress,
    args: [args.maxStaleness],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    handlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SyncDepositHandlerAbi,
    functionName: "getAsset",
    address: args.handlerAddress,
  });
}

export function getDepositorAllowlist(
  client: Client,
  args: Viem.ContractCallParameters<{
    handlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SyncDepositHandlerAbi,
    functionName: "getDepositorAllowlist",
    address: args.handlerAddress,
  });
}

export function getMaxSharePriceStaleness(
  client: Client,
  args: Viem.ContractCallParameters<{
    handlerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: SyncDepositHandlerAbi,
    functionName: "getMaxSharePriceStaleness",
    address: args.handlerAddress,
  });
}
