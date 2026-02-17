import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind, Status } from "../releases.js";

export default defineDeployment<typeof Deployment.BASE>({
  inception: 35306000,
  kind: Kind.LIVE,
  label: "Base",
  network: Network.BASE,
  releases: {
    [Version.ONE]: {
      contracts: {
        AccountERC20TrackerFactory: "0x01aab9618902436d375f864c874b8d7848a0a046",
        AccountERC20Tracker: "0x84cff8b90377943b5485e65a9c4c870a7772e09c",
        ContinuousFlatRateManagementFeeTrackerFactory: "0x93b7537ed9ecfb7bd0b7f4d0252d768c465c1975",
        ContinuousFlatRateManagementFeeTracker: "0x86132f3c9a40e4cf26cd59a47e5f1c726acb5ea8",
        ContinuousFlatRatePerformanceFeeTrackerFactory: "0x35755ca143ba395689f5da3d22f415fc07a62dd2",
        ContinuousFlatRatePerformanceFeeTracker: "0x9fc697499b31b9fdae9e873db693ec730a58ac67",
        ERC7540LikeDepositQueueFactory: "0xdefad5119f7b8ef754ccb11a4cf4956a3ec3d643",
        ERC7540LikeDepositQueue: "0x8a757022c40bc2f35ff88a0d6b34ff23dd04ab1a",
        ERC7540LikeRedeemQueueFactory: "0x5be587a9572f29c22bd921fc708043aa5e934b9d",
        ERC7540LikeRedeemQueue: "0xb6a394079d39f917a4a0b6d0adf3a9652f631c64",
        FeeHandlerFactory: "0x2099fddea3d9d9e8747692e5813cd46e042f6a0b",
        FeeHandler: "0x09d235c48a2daef679f5fee816772b81f992527f",
        GlobalProxy: "0x57f1618ed29c1570e147af89634647e6c4a9ee3b",
        Global: "0xe9d47609ea5bc93027be705a42948cebd80f775a",
        LimitedAccessLimitedCallForwarderFactory: "0xadda32674a83baebec9990e3c87eb312cb2d428b",
        LimitedAccessLimitedCallForwarder: "0x00c616caf20553da7273a769e7273f0234c327f9",
        LinearCreditDebtTrackerFactory: "0xf4d7a23fe6717e27fdc59776e6ace833ec3a8e34",
        LinearCreditDebtTracker: "0x38dcab88978188c59e75724f4afcd0d76124a9d1",
        SharesFactory: "0x5dd79d299e24e49fadac046728e80d1f7414d44c",
        Shares: "0x8c1d64562e30f3e306051adc401ec9823b0b30a2",
        ValuationHandlerFactory: "0x5503042561bc942cd4be9a6c20872753b6217b43",
        ValuationHandler: "0x1b01f24c3ff9e0e0003c1abf5b66d5fe55106d22",
      },
      inception: 35306000,
      network: Network.BASE,
      slug: `${Deployment.BASE}.${Version.ONE}`,
      status: Status.LIVE,
      version: Version.ONE,
    },
  },
  slug: Deployment.BASE,
});
