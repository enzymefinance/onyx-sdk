import { DeterministicBeaconFactoryAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deployProxy(args: { factoryAddress: Address; salt: Hex; initData: Hex }) {
  return new Viem.PopulatedTransaction({
    abi: DeterministicBeaconFactoryAbi,
    functionName: "deployProxy",
    address: args.factoryAddress,
    args: [args.salt, args.initData],
  });
}

export function setImplementation(args: { factoryAddress: Address; implementation: Address }) {
  return new Viem.PopulatedTransaction({
    abi: DeterministicBeaconFactoryAbi,
    functionName: "setImplementation",
    address: args.factoryAddress,
    args: [args.implementation],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function computeProxyAddress(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
    deployer: Address;
    salt: Hex;
    initData: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DeterministicBeaconFactoryAbi,
    functionName: "computeProxyAddress",
    address: args.factoryAddress,
    args: [args.deployer, args.salt, args.initData],
  });
}

export function getImplementation(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DeterministicBeaconFactoryAbi,
    functionName: "implementation",
    address: args.factoryAddress,
  });
}

export function isInstance(
  client: Client,
  args: Viem.ContractCallParameters<{
    factoryAddress: Address;
    who: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DeterministicBeaconFactoryAbi,
    functionName: "isInstance",
    address: args.factoryAddress,
    args: [args.who],
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
    abi: DeterministicBeaconFactoryAbi,
    functionName: "GLOBAL",
    address: args.factoryAddress,
  });
}
