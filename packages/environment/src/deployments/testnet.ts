import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind, Status } from "../releases.js";

export default defineDeployment<typeof Deployment.TESTNET>({
  inception: 40498144,
  kind: Kind.TEST,
  label: "Testnet",
  network: Network.BASE,
  releases: {
    [Version.ONE]: {
      contracts: {
        AccountERC20TrackerFactory: "0xa4f8ae56c989dad90569e35ad46239cde1c3d176",
        AccountERC20Tracker: "0x6e32e3fc6018bf836d39c6687ca00116dd518faf",
        ContinuousFlatRateManagementFeeTrackerFactory: "0xfe8abb19250b05653e02ce2b42dc31f32a9b33f2",
        ContinuousFlatRateManagementFeeTracker: "0x7f95a241709f643c1a46c8d743a2d28d4b72acb7",
        ContinuousFlatRatePerformanceFeeTrackerFactory: "0x57a469eb614bc8a7e8439b213d1bf81934b0d05a",
        ContinuousFlatRatePerformanceFeeTracker: "0x09e8374b867ae7f014b2d57775f79a98e090ed9e",
        ERC7540LikeDepositQueueFactory: "0x39e97a433d40f634bc5e6ad9a7e65e7e2a1c8f93",
        ERC7540LikeDepositQueue: "0xdf83545246da00537e867b4ac8057c5bace99d42",
        ERC7540LikeRedeemQueueFactory: "0x207c7b4d1280675f017df7b71c74bf7b8767d5fa",
        ERC7540LikeRedeemQueue: "0x6126f93a07787042e1a2dc2fcc6e971dbd1a2feb",
        FeeHandlerFactory: "0xff046260403f62f9b11aa4225b313e6f55fac029",
        FeeHandler: "0x16939332db286fde65a728dad919b49a96c604f1",
        GlobalProxy: "0x9cda24866be46ca5990366f8221baf3187b21205",
        Global: "0x5204111848ed47c52028bfdb9c4389bb2b59c8e6",
        LimitedAccessLimitedCallForwarderFactory: "0x3caa8245c3660dc5cdeeadd1662ccce16664c00d",
        LimitedAccessLimitedCallForwarder: "0x8bdfd9a4a9f9e083f08b4f40061555186e01cbf9",
        LinearCreditDebtTrackerFactory: "0x3ba7185c733f7a3a33404815a47c10cca30c55d9",
        LinearCreditDebtTracker: "0x43c6ef94056b037a51f2e584fc84820ca4f1feba",
        SharesFactory: "0x1ead4ba87102d9d0b73e888ba2bc42fbd9595f23",
        Shares: "0xd0c3e2e2694f04c91819c8cb4fb31be39254446c",
        ValuationHandlerFactory: "0x1d65535d00243454a6c2218cd89cb315f2c88cb5",
        ValuationHandler: "0x67a1181c52ff5366d1f80aeed9932f23bbd6bf80",
      },
      inception: 40498144,
      network: Network.BASE,
      slug: `${Deployment.TESTNET}.${Version.ONE}`,
      status: Status.LIVE,
      version: Version.ONE,
    },
  },
  slug: Deployment.TESTNET,
});
