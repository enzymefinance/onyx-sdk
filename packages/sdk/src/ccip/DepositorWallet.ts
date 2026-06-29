import { DepositorWalletAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getUser(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositorWalletAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DepositorWalletAbi,
    functionName: "getUser",
    address: args.depositorWalletAddress,
  });
}

export function getChainSelector(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositorWalletAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DepositorWalletAbi,
    functionName: "getChainSelector",
    address: args.depositorWalletAddress,
  });
}

export function getWalletsManager(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositorWalletAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DepositorWalletAbi,
    functionName: "getWalletsManager",
    address: args.depositorWalletAddress,
  });
}

export function getCcipRouter(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositorWalletAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: DepositorWalletAbi,
    functionName: "CCIP_ROUTER",
    address: args.depositorWalletAddress,
  });
}
