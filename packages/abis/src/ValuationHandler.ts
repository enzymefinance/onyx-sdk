export const ValuationHandlerAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "RATE_PRECISION",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "VALUATION_HANDLER_STORAGE_LOCATION",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "VALUATION_HANDLER_STORAGE_LOCATION_ID",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addPositionTracker",
    inputs: [
      {
        name: "_positionTracker",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertAssetAmountToValue",
    inputs: [
      { name: "_asset", type: "address", internalType: "address" },
      { name: "_assetAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "value_", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "convertValueToAssetAmount",
    inputs: [
      { name: "_value", type: "uint256", internalType: "uint256" },
      { name: "_asset", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "assetAmount_", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAssetRateInfo",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "assetRateInfo_",
        type: "tuple",
        internalType: "struct ValuationHandler.AssetRateInfo",
        components: [
          { name: "rate", type: "uint128", internalType: "uint128" },
          { name: "expiry", type: "uint40", internalType: "uint40" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultSharePrice",
    inputs: [],
    outputs: [{ name: "sharePrice_", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getPositionTrackers",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSharePrice",
    inputs: [],
    outputs: [
      { name: "price_", type: "uint256", internalType: "uint256" },
      { name: "timestamp_", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getShareValue",
    inputs: [],
    outputs: [
      { name: "value_", type: "uint256", internalType: "uint256" },
      { name: "timestamp_", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPositionTracker",
    inputs: [
      {
        name: "_positionTracker",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removePositionTracker",
    inputs: [
      {
        name: "_positionTracker",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAssetRate",
    inputs: [
      {
        name: "_rateInput",
        type: "tuple",
        internalType: "struct ValuationHandler.AssetRateInput",
        components: [
          { name: "asset", type: "address", internalType: "address" },
          { name: "rate", type: "uint128", internalType: "uint128" },
          { name: "expiry", type: "uint40", internalType: "uint40" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAssetRatesThenUpdateShareValue",
    inputs: [
      {
        name: "_rateInputs",
        type: "tuple[]",
        internalType: "struct ValuationHandler.AssetRateInput[]",
        components: [
          { name: "asset", type: "address", internalType: "address" },
          { name: "rate", type: "uint128", internalType: "uint128" },
          { name: "expiry", type: "uint40", internalType: "uint40" },
        ],
      },
      {
        name: "_untrackedPositionsValue",
        type: "int256",
        internalType: "int256",
      },
    ],
    outputs: [
      {
        name: "netShareValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateShareValue",
    inputs: [
      {
        name: "_untrackedPositionsValue",
        type: "int256",
        internalType: "int256",
      },
    ],
    outputs: [
      {
        name: "netShareValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AssetRateSet",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "rate",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "expiry",
        type: "uint40",
        indexed: false,
        internalType: "uint40",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PositionTrackerAdded",
    inputs: [
      {
        name: "positionTracker",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PositionTrackerRemoved",
    inputs: [
      {
        name: "positionTracker",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ShareValueUpdated",
    inputs: [
      {
        name: "netShareValue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "trackedPositionsValue",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "untrackedPositionsValue",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
      {
        name: "totalFeesOwed",
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
    name: "SafeCastOverflowedIntToUint",
    inputs: [{ name: "value", type: "int256", internalType: "int256" }],
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
  {
    type: "error",
    name: "ValuationHandler__AddPositionTracker__AlreadyAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "ValuationHandler__RemovePositionTracker__AlreadyRemoved",
    inputs: [],
  },
  {
    type: "error",
    name: "ValuationHandler__ValidateRate__RateExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "ValuationHandler__ValidateRate__RateNotSet",
    inputs: [],
  },
] as const;
