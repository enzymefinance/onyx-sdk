import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind, Status } from "../releases.js";

export default defineDeployment<typeof Deployment.ARBITRUM>({
  inception: 377255746,
  kind: Kind.LIVE,
  label: "Arbitrum",
  network: Network.ARBITRUM,
  releases: {
    [Version.ONE]: {
      contracts: {
        AccountERC20TrackerFactory: "0x9ecb2904f7adaaa684e48632791b5b3c29c2ecea",
        AccountERC20Tracker: "0x50b8030fed360293dd961a36b87a2dcc5550d306",
        ContinuousFlatRateManagementFeeTrackerFactory: "0x280c921c34598c83d8ad2dd21f7176c593342dd7",
        ContinuousFlatRateManagementFeeTracker: "0x921986e7fc0988eeae2b758e4a6874d49f91e71f",
        ContinuousFlatRatePerformanceFeeTrackerFactory: "0x73673ad39e391e708f8944608b03af8970c0343b",
        ContinuousFlatRatePerformanceFeeTracker: "0x67dd39db68618e32b801654006f133b6ead7116b",
        ERC7540LikeDepositQueueFactory: "0xdeabb9d2f30bec34ba75543656e4d197d06a51dc",
        ERC7540LikeDepositQueue: "0x27e5589d0406f7a9eb03a597c95132bf2c82f461",
        ERC7540LikeRedeemQueueFactory: "0xc4cbc4f610e59a98e2f3d18950add0054e6c74bb",
        ERC7540LikeRedeemQueue: "0xeb8278433a976b09d49518e1171d0d65469a813d",
        FeeHandlerFactory: "0x2a8f4e57655946e30cc54b101b8c942d1cf6c52b",
        FeeHandler: "0xf3b69f059e9a130b172592eb87bf632d3a88bb97",
        GlobalProxy: "0x83398d18ea22c5e85b009496bf2a521cb9c84be6",
        Global: "0x1e3d1f3f3a5e2e4f3c2e8f0f4c6f4e8f0f4c6f4e",
        LimitedAccessLimitedCallForwarderFactory: "0x330b9b3875ab5df556a150268d115204c193b956",
        LimitedAccessLimitedCallForwarder: "0xff0342b66feb8a9e4c463d32c3bacc5bcbfeaf79",
        LinearCreditDebtTrackerFactory: "0xe15c7f82db7880a7beb87be99c1f24c3ac5da6e1",
        LinearCreditDebtTracker: "0x95f683c53083352902926779e19956d7eee45e0e",
        SharesFactory: "0x1f3dee32af318d4ecaf18f1ddd901b606edb15f5",
        Shares: "0xa68ab79f8040a8c034921ca9d7e001130719b489",
        ValuationHandlerFactory: "0xdfcd4aee045dc4122c30cdeaaf5eea8b379e8778",
        ValuationHandler: "0xdcf1cec21190f8ae193e9571d1261cc417aab930",
      },
      inception: 377255746,
      network: Network.ARBITRUM,
      slug: `${Deployment.ARBITRUM}.${Version.ONE}`,
      status: Status.LIVE,
      version: Version.ONE,
    },
  },
  slug: Deployment.ARBITRUM,
});
