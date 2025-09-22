export const FeeHandlerAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "claimFees",
    inputs: [
      { name: "_onBehalf", type: "address", internalType: "address" },
      { name: "_value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "feeAssetAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getEntranceFeeBps",
    inputs: [],
    outputs: [
      {
        name: "entranceFeeBps_",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEntranceFeeRecipient",
    inputs: [],
    outputs: [
      {
        name: "entranceFeeRecipient_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExitFeeBps",
    inputs: [],
    outputs: [{ name: "exitFeeBps_", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExitFeeRecipient",
    inputs: [],
    outputs: [
      {
        name: "exitFeeRecipient_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeAsset",
    inputs: [],
    outputs: [{ name: "feeAsset_", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getManagementFeeRecipient",
    inputs: [],
    outputs: [
      {
        name: "managementFeeRecipient_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getManagementFeeTracker",
    inputs: [],
    outputs: [
      {
        name: "managementFeeTracker_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPerformanceFeeRecipient",
    inputs: [],
    outputs: [
      {
        name: "performanceFeeRecipient_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPerformanceFeeTracker",
    inputs: [],
    outputs: [
      {
        name: "performanceFeeTracker_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalValueOwed",
    inputs: [],
    outputs: [
      {
        name: "totalValueOwed_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getValueOwedToUser",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [{ name: "valueOwed_", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setEntranceFee",
    inputs: [
      { name: "_feeBps", type: "uint16", internalType: "uint16" },
      { name: "_recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setExitFee",
    inputs: [
      { name: "_feeBps", type: "uint16", internalType: "uint16" },
      { name: "_recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeAsset",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setManagementFee",
    inputs: [
      {
        name: "_managementFeeTracker",
        type: "address",
        internalType: "address",
      },
      { name: "_recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPerformanceFee",
    inputs: [
      {
        name: "_performanceFeeTracker",
        type: "address",
        internalType: "address",
      },
      { name: "_recipient", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settleDynamicFeesGivenPositionsValue",
    inputs: [
      {
        name: "_totalPositionsValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settleEntranceFeeGivenGrossShares",
    inputs: [
      {
        name: "_grossSharesAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "feeSharesAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settleExitFeeGivenGrossShares",
    inputs: [
      {
        name: "_grossSharesAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "feeSharesAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "EntranceFeeSet",
    inputs: [
      {
        name: "feeBps",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EntranceFeeSettled",
    inputs: [
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExitFeeSet",
    inputs: [
      {
        name: "feeBps",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExitFeeSettled",
    inputs: [
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeAssetSet",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeesClaimed",
    inputs: [
      {
        name: "onBehalf",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "feeAsset",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "feeAssetAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagementFeeSet",
    inputs: [
      {
        name: "managementFeeTracker",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagementFeeSettled",
    inputs: [
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PerformanceFeeSet",
    inputs: [
      {
        name: "performanceFeeTracker",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PerformanceFeeSettled",
    inputs: [
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TotalValueOwedUpdated",
    inputs: [
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserValueOwedUpdated",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "value",
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
    name: "FeeHandler__ClaimFees__ZeroFeeAsset",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SetEntranceFee__ExceedsMax",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SetExitFee__ExceedsMax",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SetManagementFee__RecipientZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SetPerformanceFee__RecipientZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SettleDynamicFeesGivenPositionsValue__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SettleEntranceFeeGivenGrossShares__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeHandler__SettleExitFeeGivenGrossShares__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
