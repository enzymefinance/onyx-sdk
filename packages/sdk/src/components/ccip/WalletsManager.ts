import { ERC7540LikeDepositQueueAbi, ERC7540LikeRedeemQueueAbi, WalletsManagerAbi } from "@enzymefinance/onyx-abis";
import {
  type Address,
  type Client,
  concatHex,
  encodeAbiParameters,
  encodeFunctionData,
  type Hex,
  zeroAddress,
} from "viem";
import { readContract } from "viem/actions";
import type { CCIPMessage } from "../../ccip/CCIPRouter.js";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// CCIP HELPERS
//--------------------------------------------------------------------------------------------

// bytes4(keccak256("CCIP EVMExtraArgsV2"))
const EVM_EXTRA_ARGS_V2_TAG: Hex = "0x181dcf10";

export function encodeCcipExtraArgs(args: { gasLimit: bigint; allowOutOfOrderExecution?: boolean }): Hex {
  const encoded = encodeAbiParameters(
    [{ type: "uint256" }, { type: "bool" }],
    [args.gasLimit, args.allowOutOfOrderExecution ?? true],
  );
  return concatHex([EVM_EXTRA_ARGS_V2_TAG, encoded]);
}

export type Call = { target: Address; data: Hex; value: bigint };

export function encodeCcipMessageData(args: {
  calls: readonly Call[];
  tokensToReturn?: readonly Address[];
  returnExtraArgs?: Hex;
  returnFeeToken?: Address;
}): Hex {
  return encodeAbiParameters(
    [
      {
        type: "tuple[]",
        components: [
          { type: "address", name: "target" },
          { type: "bytes", name: "data" },
          { type: "uint256", name: "value" },
        ],
      },
      { type: "address[]" },
      { type: "bytes" },
      { type: "address" },
    ],
    [args.calls, args.tokensToReturn ?? [], args.returnExtraArgs ?? "0x", args.returnFeeToken ?? zeroAddress],
  );
}

//--------------------------------------------------------------------------------------------
// CANCEL FLOW BUILDERS
//--------------------------------------------------------------------------------------------

// Cancel-deposit over CCIP. The destination DepositorWallet calls `cancelDeposit` on the queue;
// the queue returns the deposit asset to the wallet which then bridges it back to the user. The
// return message carries only the deposit asset (CCIP lanes enforce a max of 1 token per message);
// any wrapped-native left over after paying the return fee stays on the DepositorWallet and is
// recoverable via the admin `batchSendTokensViaCCIP` sweep.
export function buildCancelDepositCcipMessage(args: {
  walletsManagerAddress: Address;
  queueAddress: Address;
  requestId: bigint;
  depositAsset: Address;
  sourceWrappedNative: Address;
  destinationWrappedNative: Address;
  wrappedNativeAmount: bigint;
  gasLimit: bigint;
  allowOutOfOrderExecution?: boolean;
  returnGasLimit?: bigint;
}): CCIPMessage {
  const calls: readonly Call[] = [
    {
      target: args.queueAddress,
      data: encodeFunctionData({
        abi: ERC7540LikeDepositQueueAbi,
        functionName: "cancelDeposit",
        args: [args.requestId],
      }),
      value: 0n,
    },
  ];

  const data = encodeCcipMessageData({
    calls,
    tokensToReturn: [args.depositAsset],
    returnFeeToken: args.destinationWrappedNative,
    returnExtraArgs:
      args.returnGasLimit !== undefined
        ? encodeCcipExtraArgs({
            gasLimit: args.returnGasLimit,
            allowOutOfOrderExecution: args.allowOutOfOrderExecution ?? true,
          })
        : "0x",
  });

  return {
    receiver: encodeAbiParameters([{ type: "address" }], [args.walletsManagerAddress]),
    data,
    tokenAmounts: [{ token: args.sourceWrappedNative, amount: args.wrappedNativeAmount }],
    feeToken: zeroAddress,
    extraArgs: encodeCcipExtraArgs({
      gasLimit: args.gasLimit,
      allowOutOfOrderExecution: args.allowOutOfOrderExecution ?? true,
    }),
  };
}

// Cancel-redeem over CCIP. Shares are returned to the destination DepositorWallet by the queue;
// no return message is needed, so no wrapped-native fee is required from the user.
export function buildCancelRedeemCcipMessage(args: {
  walletsManagerAddress: Address;
  queueAddress: Address;
  requestId: bigint;
  gasLimit: bigint;
  allowOutOfOrderExecution?: boolean;
}): CCIPMessage {
  const calls: readonly Call[] = [
    {
      target: args.queueAddress,
      data: encodeFunctionData({
        abi: ERC7540LikeRedeemQueueAbi,
        functionName: "cancelRedeem",
        args: [args.requestId],
      }),
      value: 0n,
    },
  ];

  const data = encodeCcipMessageData({ calls });

  return {
    receiver: encodeAbiParameters([{ type: "address" }], [args.walletsManagerAddress]),
    data,
    tokenAmounts: [],
    feeToken: zeroAddress,
    extraArgs: encodeCcipExtraArgs({
      gasLimit: args.gasLimit,
      allowOutOfOrderExecution: args.allowOutOfOrderExecution ?? true,
    }),
  };
}

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type BatchSendParam = {
  wallet: Address;
  tokens: readonly Address[];
  extraArgs: Hex;
};

export function batchSendTokensViaCCIP(args: {
  walletsManagerAddress: Address;
  params: readonly BatchSendParam[];
  value: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: WalletsManagerAbi,
    functionName: "batchSendTokensViaCCIP",
    address: args.walletsManagerAddress,
    args: [args.params],
    value: args.value,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function computeWalletAddress(
  client: Client,
  args: Viem.ContractCallParameters<{
    walletsManagerAddress: Address;
    sourceChainSelector: bigint;
    user: Hex;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: WalletsManagerAbi,
    functionName: "computeWalletAddress",
    address: args.walletsManagerAddress,
    args: [args.sourceChainSelector, args.user],
  });
}

export function getRouter(
  client: Client,
  args: Viem.ContractCallParameters<{
    walletsManagerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: WalletsManagerAbi,
    functionName: "getRouter",
    address: args.walletsManagerAddress,
  });
}

export function getDepositorWalletsFactory(
  client: Client,
  args: Viem.ContractCallParameters<{
    walletsManagerAddress: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: WalletsManagerAbi,
    functionName: "DEPOSITOR_WALLETS_FACTORY",
    address: args.walletsManagerAddress,
  });
}
