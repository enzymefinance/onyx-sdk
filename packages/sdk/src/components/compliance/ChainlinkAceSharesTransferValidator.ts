import { ChainlinkAceSharesTransferValidatorAbi } from "@enzymefinance/onyx-abis";
import { type Address, encodeFunctionData } from "viem";
import { deployProxy } from "../../factories/ComponentBeaconFactory.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deploy(args: { factoryAddress: Address; sharesAddress: Address; policyEngineAddress: Address }) {
  const initData = encodeFunctionData({
    abi: ChainlinkAceSharesTransferValidatorAbi,
    functionName: "init",
    args: [args.policyEngineAddress],
  });

  return deployProxy({
    factoryAddress: args.factoryAddress,
    shares: args.sharesAddress,
    initData,
  });
}
