import { ChainlinkAcePolicyProtectedBaseAbi } from "@enzymefinance/onyx-abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function attachPolicyEngine(args: { validatorAddress: Address; policyEngineAddress: Address }) {
  return new Viem.PopulatedTransaction({
    abi: ChainlinkAcePolicyProtectedBaseAbi,
    functionName: "attachPolicyEngine",
    address: args.validatorAddress,
    args: [args.policyEngineAddress],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getPolicyEngine(
  client: Client,
  args: Viem.ContractCallParameters<{
    validatorAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ChainlinkAcePolicyProtectedBaseAbi,
    functionName: "getPolicyEngine",
    address: args.validatorAddress,
  });
}
