import { Version } from "../contracts.js";
import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind, Status } from "../releases.js";

export default defineDeployment<typeof Deployment.ETHEREUM>({
  inception: 23324026,
  kind: Kind.LIVE,
  label: "Ethereum",
  network: Network.ETHEREUM,
  releases: {
    [Version.ONE]: {
      contracts: {
        AccountERC20TrackerFactory: "0x4622073e8417fa4c531f62fd42496ea88837d3e8",
        AccountERC20Tracker: "0x6bc4e4c81d7916f075c91b65693436188c66bd42",
        ContinuousFlatRateManagementFeeTrackerFactory: "0xc0759738985b392041d095490bdaf418ee8d5cb9",
        ContinuousFlatRateManagementFeeTracker: "0xa646763b9a12650d5b97bc1365c190620353bb78",
        ContinuousFlatRatePerformanceFeeTrackerFactory: "0x5b1533b254052ea32303633bfd301dd2fa816b90",
        ContinuousFlatRatePerformanceFeeTracker: "0x925cf3261bc9e993073a8d896f60fe6b09840a13",
        ERC7540LikeDepositQueueFactory: "0x01583dcda252b80724087e631681d4caf8cc21f3",
        ERC7540LikeDepositQueue: "0xe699c8636ea9166d775f29e6f563dbc02565f492",
        ERC7540LikeRedeemQueueFactory: "0x34dcb2ccce683d971bf1b64fc0a87da678b3e708",
        ERC7540LikeRedeemQueue: "0x2c7b9f6f77de567eb3ab837b894fa599e6a7daae",
        FeeHandlerFactory: "0xe33a18bb5da7f7442034a4e06267fe08fdd68438",
        FeeHandler: "0xfcd1d7926fc69709a778b65d94829be593d83b54",
        GlobalProxy: "0x4eae0e594df9bea235fff3e44d93a3e383b87bad",
        Global: "0x8587614f689f10111236924ef9054f695f07a69a",
        LimitedAccessLimitedCallForwarderFactory: "0x6cc904b020fbc2ce1779e1f9b6d7829a6a8e2adb",
        LimitedAccessLimitedCallForwarder: "0xa49c68866ef6f01e5f43cbc2a0c7cad16f480a2f",
        LinearCreditDebtTrackerFactory: "0x9afcda45231ad5df5fe2f20592453e8cfbf6b515",
        LinearCreditDebtTracker: "0x3bfe07e547e35f1debe8944eb3fa6d13f75205b8",
        SharesFactory: "0x03fbf254a0ed3b1d9c94eee5b39c7a11fd96eb06",
        Shares: "0x3f4c0276779e4488f937d5befa7841dac64a5ebf",
        ValuationHandlerFactory: "0x38f940ece3456b1041e5409b05d3278abd5f446d",
        ValuationHandler: "0x7a5b5fde46ff2fd8dec412a38dafdce4822ccb25",
      },
      inception: 23324026,
      network: Network.ETHEREUM,
      slug: `${Deployment.ETHEREUM}.${Version.ONE}`,
      status: Status.LIVE,
      version: Version.ONE,
    },
  },
  slug: Deployment.ETHEREUM,
});
