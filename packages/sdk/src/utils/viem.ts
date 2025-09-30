import {
  type Abi,
  type AccessList,
  type Account,
  type Address,
  type BlockNumber,
  type BlockTag,
  type CallParameters,
  type Chain,
  type Client,
  type ContractFunctionName,
  type ContractFunctionParameters,
  type EstimateContractGasReturnType,
  type EstimateGasParameters,
  encodeFunctionData,
  type GetValue,
  type Hex,
  type SimulateContractReturnType,
  type Transport,
  type WalletClient,
} from "viem";
import { estimateContractGas, simulateContract } from "viem/actions";

export type PopulatedTransactionParams<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "payable" | "nonpayable"> = ContractFunctionName<
    TAbi,
    "payable" | "nonpayable"
  >,
> = ContractFunctionParameters<TAbi, "payable" | "nonpayable", TFunctionName> & GetValue<TAbi, TFunctionName, bigint>;

export type PopulatedTransactionSimulateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
  account: Account | Address;
} & Omit<CallParameters, "batch" | "to" | "data" | "value">;

export type PopulatedTransactionEstimateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
} & Omit<EstimateGasParameters, "data" | "to" | "value">;

export class PopulatedTransaction<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "payable" | "nonpayable"> = ContractFunctionName<
    TAbi,
    "payable" | "nonpayable"
  >,
> {
  constructor(public readonly params: PopulatedTransactionParams<TAbi, TFunctionName>) {}

  simulate(
    client: Client,
    args?: PopulatedTransactionSimulateParams,
  ): Promise<SimulateContractReturnType<TAbi, TFunctionName>> {
    return simulateContract(client, {
      ...args,
      abi: this.params.abi,
      functionName: this.params.functionName,
      address: this.params.address,
      args: this.params.args ?? [],
      value: this.params.value ?? 0n,
      // biome-ignore lint/suspicious/noExplicitAny: needs refactoring
    } as any);
  }

  estimate(client: Client, args?: PopulatedTransactionEstimateParams): Promise<EstimateContractGasReturnType> {
    return estimateContractGas(client, {
      ...args,
      abi: this.params.abi,
      functionName: this.params.functionName,
      address: this.params.address,
      args: this.params.args ?? [],
      value: this.params.value ?? 0n,
      // biome-ignore lint/suspicious/noExplicitAny: needs refactoring
    } as any);
  }

  send(
    client: WalletClient<Transport, Chain, Account>,
    { accessList, type = "eip1559" }: { accessList?: AccessList; type?: "eip1559" } = {},
  ): Promise<Hex> {
    return client.sendTransaction({
      to: this.params.address,
      accessList,
      // biome-ignore lint/suspicious/noExplicitAny: needs refactoring
      data: encodeFunctionData(this.params as any),
      value: this.params.value,
      type,
    });
  }
}

export type ContractCallParameters<
  T extends {
    // biome-ignore lint/suspicious/noExplicitAny: needs refactoring
    [key: string]: any;
    // biome-ignore lint/complexity/noBannedTypes: needs refactoring
  } = {},
> = T &
  (
    | {
        blockTag?: BlockTag;
        blockNumber?: never;
      }
    | {
        blockNumber?: BlockNumber;
        blockTag?: never;
      }
  );

export type BlockParameters =
  | {
      blockTag?: BlockTag;
      blockNumber?: never;
    }
  | {
      blockNumber?: BlockNumber;
      blockTag?: never;
    };

export function extractBlockParameters(args: BlockParameters): BlockParameters {
  return {
    ...(args.blockNumber !== undefined ? { blockNumber: args.blockNumber } : {}),
    ...(args.blockTag !== undefined ? { blockTag: args.blockTag } : {}),
  } as BlockParameters;
}
