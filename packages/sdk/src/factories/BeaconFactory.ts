import { BeaconFactoryAbi } from "@onyx/abis";
import type { Address, Hex } from "viem";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

// Deploy

export type DeployProxyParams = {
  factoryAddress: Address;
  initData: Hex;
};

export function deployProxy(args: DeployProxyParams) {
  return new Viem.PopulatedTransaction({
    abi: BeaconFactoryAbi,
    functionName: "deployProxy",
    address: args.factoryAddress,
    args: [args.initData],
  });
}

// Upgrade

export function setImplementation(args: { sharesFactoryAddress: Address; implementation: Address }) {
  return new Viem.PopulatedTransaction({
    abi: BeaconFactoryAbi,
    functionName: "setImplementation",
    address: args.sharesFactoryAddress,
    args: [args.implementation],
  });
}
