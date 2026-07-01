import { CreWorkflowConsumerAbi } from "@enzymefinance/onyx-abis";
import { type Address, type Client, encodeAbiParameters, type Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils";
import { type Call, executeCallsAbiParameter } from "../roles/LimitedAccessLimitedCallForwarder";

//--------------------------------------------------------------------------------------------
// TYPES
//--------------------------------------------------------------------------------------------

export type Report = { nonce: bigint; expiresAt: bigint; calls: Call[] };

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getLastNonce(
  client: Client,
  args: Viem.ContractCallParameters<{
    creWorkflowConsumerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: CreWorkflowConsumerAbi,
    functionName: "getLastNonce",
    address: args.creWorkflowConsumerAddress,
  });
}

//--------------------------------------------------------------------------------------------
// ENCODE
//--------------------------------------------------------------------------------------------

const reportAbiParameters = [
  {
    type: "tuple",
    components: [
      { name: "nonce", type: "uint256" },
      { name: "expiresAt", type: "uint256" },
      { ...executeCallsAbiParameter.inputs[0], name: "calls" },
    ],
  },
] as const;

export function encodeReport(report: Report): Hex {
  return encodeAbiParameters(reportAbiParameters, [report]);
}
