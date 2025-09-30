export const ContinuousFlatRatePerformanceFeeTrackerAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "getHighWaterMark",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRate",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "resetHighWaterMark",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRate",
    inputs: [{ name: "_rate", type: "uint16", internalType: "uint16" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settlePerformanceFee",
    inputs: [{ name: "_netValue", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "valueDue_", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "HighWaterMarkUpdated",
    inputs: [
      {
        name: "highWaterMark",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RateSet",
    inputs: [
      {
        name: "rate",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Settled",
    inputs: [
      {
        name: "valueDue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ComponentHelpersMixin__OnlyAdminOrOwner__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "ComponentHelpersMixin__OnlyShares__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "ContinuousFlatRatePerformanceFeeTracker__SetRate__ExceedsMax",
    inputs: [],
  },
  {
    type: "error",
    name: "ContinuousFlatRatePerformanceFeeTracker__SettlePerformanceFee__HighWaterMarkNotInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeTrackerHelpersMixin__OnlyFeeHandler__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeCastOverflowedUintDowncast",
    inputs: [
      { name: "bits", type: "uint8", internalType: "uint8" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
