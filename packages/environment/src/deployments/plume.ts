import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind, Status } from "../releases.js";

export default defineDeployment<Deployment.PLUME>({
  inception: 28447435,
  kind: Kind.LIVE,
  label: "Plume",
  network: Network.PLUME,
  releases: {
    [Version.ONE]: {
      contracts: {
        AccountERC20Tracker: "0x0ea28be6ffc57e0f95a489e03e935a23a0a98654",
        AccountERC20TrackerFactory: "0x0ebe720b5af7c15be21536f6f43b75328e8356e0",
        ContinuousFlatRateManagementFeeTracker: "0x6fcad999f8ea426049f957295e9845948dcd5dac",
        ContinuousFlatRateManagementFeeTrackerFactory: "0x3e957d8ea89244627342b94280b98e2ccc3a700d",
        ContinuousFlatRatePerformanceFeeTracker: "0x95d54d79ab21a54a49a336aeac617fd6a8e6d228",
        ContinuousFlatRatePerformanceFeeTrackerFactory: "0x82de34583a276e777287b7bb165df6ab7eaa0ce4",
        ERC7540LikeDepositQueue: "0xbc3f5cb6b3e53207c3e3cda592985c70b2aeba5c",
        ERC7540LikeDepositQueueFactory: "0x6e29f4a4b2ab5c9c17ddcb4b0a7eaad40dc13101",
        ERC7540LikeRedeemQueue: "0x9dd862aacaca03437cc9128d1be638d6688847f1",
        ERC7540LikeRedeemQueueFactory: "0xa1c3b8b6b16a61f6ebc539879aa27e7c8ea57bf3",
        FeeHandler: "0xbca98a8c7d1c2ce52dcbbbd10c4400778cef8aea",
        FeeHandlerFactory: "0x895aa70b2561a1c3df982dc941fdb897344ee6a6",
        Global: "0x7e18508d5f16b754342f83813373ebad0b0bb74c",
        GlobalProxy: "0x1db6ee7876cd9ad873f2fbcf12688ffeaba35d10",
        LimitedAccessLimitedCallForwarder: "0x7e5cf6d9afc9bb49241c4c8573a2f3139052c60b",
        LimitedAccessLimitedCallForwarderFactory: "0xaab0ee9c9d83eb672820434860a6b8c01f56d68e",
        LinearCreditDebtTracker: "0xd6cd1055f95e6c4b94c32297002df48c77d52345",
        LinearCreditDebtTrackerFactory: "0xf6d3fa085260e144919ec0e54f456ed8337d5232",
        Shares: "0xbfadbc1107be7fea014e28756d5ec98e492db287",
        SharesFactory: "0x7b45838d3960d7eee333e5b28ce2f565f8c52534",
        ValuationHandler: "0x6580e22e685010bc69756a9075b51e2512eb192a",
        ValuationHandlerFactory: "0x9eceb8b0081b9df25ff271bf24735d6dea671d78",
      },
      inception: 28447435,
      network: Network.PLUME,
      slug: `${Deployment.PLUME}.${Version.ONE}`,
      status: Status.LIVE,
      version: Version.ONE,
    },
  },
  slug: Deployment.PLUME,
});
