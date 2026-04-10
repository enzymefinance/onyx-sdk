import type { Address } from "viem";
import { Deployment, type DeploymentType } from "./releases";

export enum Version {
  ONE = "one",
}

export function isVersion(version: unknown): version is Version {
  return typeof version === "string" && Object.values<unknown>(Version).includes(version);
}

export type VersionContracts<
  TVersion extends Version,
  TDeployment extends DeploymentType,
> = TVersion extends Version.ONE ? VersionOneContracts<TDeployment> : never;

export interface CommonContracts {
  readonly AccountERC20TrackerFactory: Address;
  readonly AccountERC20Tracker: Address;
  readonly ContinuousFlatRateManagementFeeTrackerFactory: Address;
  readonly ContinuousFlatRateManagementFeeTracker: Address;
  readonly ContinuousFlatRatePerformanceFeeTrackerFactory: Address;
  readonly ContinuousFlatRatePerformanceFeeTracker: Address;
  readonly ERC7540LikeDepositQueueFactory: Address;
  readonly ERC7540LikeDepositQueue: Address;
  readonly ERC7540LikeRedeemQueueFactory: Address;
  readonly ERC7540LikeRedeemQueue: Address;
  readonly FeeHandlerFactory: Address;
  readonly FeeHandler: Address;
  readonly GlobalProxy: Address;
  readonly Global: Address;
  readonly LimitedAccessLimitedCallForwarderFactory: Address;
  readonly LimitedAccessLimitedCallForwarder: Address;
  readonly LinearCreditDebtTrackerFactory: Address;
  readonly LinearCreditDebtTracker: Address;
  readonly OwnableAddressListFactory: Address;
  readonly OwnableAddressList: Address;
  readonly SharesFactory: Address;
  readonly Shares: Address;
  readonly SharesOwnedAddressListFactory: Address;
  readonly SharesOwnedAddressList: Address;
  readonly SyncDepositHandlerFactory: Address;
  readonly SyncDepositHandler: Address;
  readonly ValuationHandlerFactory: Address;
  readonly ValuationHandler: Address;
}

type CreWorkflowConsumerContracts = {
  readonly CreWorkflowConsumerFactory: Address;
  readonly CreWorkflowConsumer: Address;
};

type DeploymentContractsMap = {
  [Deployment.ETHEREUM]: CreWorkflowConsumerContracts;
  [Deployment.BASE]: CreWorkflowConsumerContracts;
  [Deployment.MEGAETH]: CreWorkflowConsumerContracts;
  [Deployment.TESTNET]: CreWorkflowConsumerContracts;
  [Deployment.ARBITRUM]: CreWorkflowConsumerContracts;
  [Deployment.PLUME]: Record<never, never>;
};

export type DeploymentContracts<TDeployment extends DeploymentType> = DeploymentContractsMap[TDeployment];

export type VersionOneContracts<TDeployment extends DeploymentType> = CommonContracts &
  DeploymentContracts<TDeployment>;
