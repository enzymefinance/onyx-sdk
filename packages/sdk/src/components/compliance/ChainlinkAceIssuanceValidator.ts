import { ChainlinkAceIssuanceValidatorBaseAbi } from "@enzymefinance/onyx-abis";
import { type Address, type Client, encodeFunctionData } from "viem";
import { readContract } from "viem/actions";
import { deployProxy } from "../../factories/ComponentBeaconFactory.js";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deploy(args: {
  factoryAddress: Address;
  sharesAddress: Address;
  handlerAddress: Address;
  policyEngineAddress: Address;
}) {
  const initData = encodeFunctionData({
    abi: ChainlinkAceIssuanceValidatorBaseAbi,
    functionName: "init",
    args: [args.handlerAddress, args.policyEngineAddress],
  });

  return deployProxy({
    factoryAddress: args.factoryAddress,
    shares: args.sharesAddress,
    initData,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getHandler(
  client: Client,
  args: Viem.ContractCallParameters<{
    validatorAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ChainlinkAceIssuanceValidatorBaseAbi,
    functionName: "getHandler",
    address: args.validatorAddress,
  });
}
