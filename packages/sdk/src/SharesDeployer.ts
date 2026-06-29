import { SharesDeployerAbi } from "@enzymefinance/onyx-abis";
import type { Address, Hex } from "viem";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// ENUM CONSTANTS (mirror SharesDeployer.sol enums)
//--------------------------------------------------------------------------------------------

export const TransferValidatorSource = {
  None: 0,
  Existing: 1,
  DeployAddressLists: 2,
} as const;
export type TransferValidatorSource = (typeof TransferValidatorSource)[keyof typeof TransferValidatorSource];

export const ExternalListSource = {
  None: 0,
  Existing: 1,
  SharedAddressList: 2,
} as const;
export type ExternalListSource = (typeof ExternalListSource)[keyof typeof ExternalListSource];

export const SharedAddressListKind = {
  SharesOwned: 0,
  Ownable: 1,
} as const;
export type SharedAddressListKind = (typeof SharedAddressListKind)[keyof typeof SharedAddressListKind];

export const DepositRestriction = {
  None: 0,
  ControllerAllowlistInternal: 1,
  ControllerAllowlistExternal: 2,
} as const;
export type DepositRestriction = (typeof DepositRestriction)[keyof typeof DepositRestriction];

// Mirrors AddressListsSharesTransferValidator.ListType
export const ListType = {
  None: 0,
  Allow: 1,
  Disallow: 2,
} as const;
export type ListType = (typeof ListType)[keyof typeof ListType];

//--------------------------------------------------------------------------------------------
// TYPES (1:1 with the ABI struct)
//--------------------------------------------------------------------------------------------

export type SharesConfig = {
  name: string;
  symbol: string;
  valueAsset: Hex; // bytes32
};

export type SharedAddressListDefinition = {
  kind: number;
  ownableListOwner: Address;
  seededAddresses: readonly Address[];
};

export type AddressListsValidatorListConfig = {
  listType: number;
  externalListSource: number;
  externalListExisting: Address;
  sharedAddressListIndex: bigint;
};

export type TransferValidatorConfig = {
  source: number;
  existing: Address;
  recipientList: AddressListsValidatorListConfig;
  senderList: AddressListsValidatorListConfig;
};

export type FeeHandlerConfig = {
  deploy: boolean;
  feeAsset: Address;
  entranceFeeBps: number;
  entranceFeeRecipient: Address;
  exitFeeBps: number;
  exitFeeRecipient: Address;
};

export type ManagementFeeConfig = {
  deploy: boolean;
  feeBps: number;
  recipient: Address;
};

export type PerformanceFeeConfig = {
  deploy: boolean;
  feeBps: number;
  hurdleRateBps: number;
  recipient: Address;
};

export type AssetRateInput = {
  asset: Address;
  rate: bigint;
  expiry: number;
};

export type ValuationHandlerConfig = {
  deploy: boolean;
  assetRates: readonly AssetRateInput[];
};

export type AccountERC20TrackerConfig = {
  deploy: boolean;
  assets: readonly Address[];
};

export type LinearCreditDebtTrackerConfig = {
  deploy: boolean;
};

export type QueueDepositHandlerConfig = {
  asset: Address;
  minRequestDuration: number;
  restriction: number;
  externalListSource: number;
  externalListExisting: Address;
  sharedAddressListIndex: bigint;
  allowedDepositors: readonly Address[];
};

export type SyncDepositHandlerConfig = {
  asset: Address;
  maxSharePriceStaleness: number;
  depositorAllowlistSource: number;
  depositorAllowlistExisting: Address;
  sharedAddressListIndex: bigint;
};

export type RedeemHandlerConfig = {
  asset: Address;
  minRequestDuration: number;
};

export type ComponentsConfig = {
  feeHandler: FeeHandlerConfig;
  managementFee: ManagementFeeConfig;
  performanceFee: PerformanceFeeConfig;
  valuationHandler: ValuationHandlerConfig;
  accountERC20Tracker: AccountERC20TrackerConfig;
  linearCreditDebtTracker: LinearCreditDebtTrackerConfig;
  queueDepositHandlers: readonly QueueDepositHandlerConfig[];
  syncDepositHandlers: readonly SyncDepositHandlerConfig[];
  redeemHandlers: readonly RedeemHandlerConfig[];
};

export type PreMintRecipient = {
  to: Address;
  amount: bigint;
};

export type PreMintConfig = {
  enabled: boolean;
  untrackedPositionsValue: bigint; // int256
  recipients: readonly PreMintRecipient[];
};

export type DeployConfig = {
  shares: SharesConfig;
  nominatedOwner: Address;
  admins: readonly Address[];
  transferValidator: TransferValidatorConfig;
  components: ComponentsConfig;
  preMint: PreMintConfig;
  sharedAddressLists: readonly SharedAddressListDefinition[];
};

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deploy(args: { sharesDeployerAddress: Address; config: DeployConfig }) {
  return new Viem.PopulatedTransaction({
    abi: SharesDeployerAbi,
    functionName: "deploy",
    address: args.sharesDeployerAddress,
    args: [args.config],
  });
}
