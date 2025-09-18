import type { Address } from "viem";

export enum Version {
  ONE = "one",
}

export function isVersion(version: unknown): version is Version {
  return typeof version === "string" && Object.values<unknown>(Version).includes(version);
}

export type VersionContracts<TVersion extends Version> = TVersion extends Version.ONE ? VersionOneContracts : never;

export type Contracts = VersionOneContracts;

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
  readonly SharesFactory: Address;
  readonly Shares: Address;
  readonly ValuationHandlerFactory: Address;
  readonly ValuationHandler: Address;
}

export interface VersionOneContracts extends CommonContracts {}
