import { ComponentBeaconFactoryAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Deploy

export type DeployProxyParams = {
  factoryAddress: Address;
  shares: Address;
  initData: Hex;
};

export function deployProxy(args: DeployProxyParams) {
  return new Viem.PopulatedTransaction({
    abi: ComponentBeaconFactoryAbi,
    functionName: "deployProxy",
    address: args.factoryAddress,
    args: [args.shares, args.initData],
  });
}

// Upgrade

export function setImplementation(args: { factoryAddress: Address; implementation: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ComponentBeaconFactoryAbi,
    functionName: "setImplementation",
    address: args.factoryAddress,
    args: [args.implementation],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getImplementation(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ComponentBeaconFactoryAbi,
    functionName: "implementation",
    address: args.factoryAddress,
  });
}

export function getGlobal(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ComponentBeaconFactoryAbi,
    functionName: "GLOBAL",
    address: args.factoryAddress,
  });
}

export function getSharesForInstance(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
    instance: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ComponentBeaconFactoryAbi,
    functionName: "getSharesForInstance",
    address: args.factoryAddress,
    args: [args.instance],
  });
}
