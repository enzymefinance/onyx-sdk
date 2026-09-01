import type { Address } from "viem";
import { Deployment, type DeploymentType } from "./deployments/deployment.js";

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
  readonly AddressListsSharesTransferValidatorFactory: Address;
  readonly AddressListsSharesTransferValidator: Address;
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
  readonly SharesBurnHandlerFactory: Address;
  readonly SharesBurnHandler: Address;
  readonly SharesDeployer: Address;
  readonly SharesMintHandlerFactory: Address;
  readonly SharesMintHandler: Address;
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

type ChainlinkAceContracts = {
  readonly ChainlinkAcePreRequestDepositValidatorFactory: Address;
  readonly ChainlinkAcePreRequestDepositValidator: Address;
  readonly ChainlinkAcePostExecuteDepositRequestValidatorFactory: Address;
  readonly ChainlinkAcePostExecuteDepositRequestValidator: Address;
  readonly ChainlinkAcePreRequestRedeemValidatorFactory: Address;
  readonly ChainlinkAcePreRequestRedeemValidator: Address;
  readonly ChainlinkAcePostExecuteRedeemRequestValidatorFactory: Address;
  readonly ChainlinkAcePostExecuteRedeemRequestValidator: Address;
  readonly ChainlinkAcePostDepositValidatorFactory: Address;
  readonly ChainlinkAcePostDepositValidator: Address;
  readonly ChainlinkAcePreMintValidatorFactory: Address;
  readonly ChainlinkAcePreMintValidator: Address;
  readonly ChainlinkAcePreBurnValidatorFactory: Address;
  readonly ChainlinkAcePreBurnValidator: Address;
  readonly ChainlinkAceSharesTransferValidatorFactory: Address;
  readonly ChainlinkAceSharesTransferValidator: Address;
  readonly ChainlinkAceERC7540LikeDepositQueuePreRequestDepositExtractor: Address;
  readonly ChainlinkAceERC7540LikeDepositQueuePostExecuteDepositRequestExtractor: Address;
  readonly ChainlinkAceERC7540LikeRedeemQueuePreRequestRedeemExtractor: Address;
  readonly ChainlinkAceERC7540LikeRedeemQueuePostExecuteRedeemRequestExtractor: Address;
  readonly ChainlinkAceSyncDepositHandlerPostDepositExtractor: Address;
  readonly ChainlinkAceSharesMintHandlerPreMintExtractor: Address;
  readonly ChainlinkAceSharesBurnHandlerPreBurnExtractor: Address;
  readonly ChainlinkAceSharesTransferExtractor: Address;
};

type CCIPContracts = {
  readonly DepositorWallet: Address;
  readonly DepositorWalletFactory: Address;
  readonly WalletsManagerFactory: Address;
  readonly WalletsManager: Address;
};

type DeploymentContractsMap = {
  [Deployment.ETHEREUM]: CreWorkflowConsumerContracts & CCIPContracts & ChainlinkAceContracts;
  [Deployment.BASE]: CreWorkflowConsumerContracts & CCIPContracts & ChainlinkAceContracts;
  [Deployment.BASE_SEPOLIA]: Record<never, never>;
  [Deployment.BSC]: CreWorkflowConsumerContracts & ChainlinkAceContracts;
  [Deployment.MEGAETH]: CreWorkflowConsumerContracts & CCIPContracts & ChainlinkAceContracts;
  [Deployment.SEPOLIA]: CreWorkflowConsumerContracts & CCIPContracts & ChainlinkAceContracts;
  [Deployment.ARBITRUM]: CreWorkflowConsumerContracts & CCIPContracts & ChainlinkAceContracts;
  [Deployment.PLUME]: CCIPContracts & ChainlinkAceContracts;
  [Deployment.RAYLS]: ChainlinkAceContracts;
};

export type DeploymentContracts<TDeployment extends DeploymentType> = DeploymentContractsMap[TDeployment];

export type VersionOneContracts<TDeployment extends DeploymentType> = CommonContracts &
  DeploymentContracts<TDeployment>;
