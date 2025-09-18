export const ERC7540LikeRedeemQueueAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "asset",
    inputs: [],
    outputs: [{ name: "asset_", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cancelRedeem",
    inputs: [{ name: "_requestId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "shares_", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeRedeemRequests",
    inputs: [
      {
        name: "_requestIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getRedeemLastId",
    inputs: [],
    outputs: [{ name: "", type: "uint128", internalType: "uint128" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRedeemMinRequestDuration",
    inputs: [],
    outputs: [{ name: "", type: "uint24", internalType: "uint24" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRedeemRequest",
    inputs: [{ name: "_requestId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ERC7540LikeRedeemQueue.RedeemRequestInfo",
        components: [
          {
            name: "controller",
            type: "address",
            internalType: "address",
          },
          {
            name: "canCancelTime",
            type: "uint40",
            internalType: "uint40",
          },
          {
            name: "sharesAmount",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "requestRedeem",
    inputs: [
      { name: "_shares", type: "uint256", internalType: "uint256" },
      { name: "_controller", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "requestId_", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAsset",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRedeemMinRequestDuration",
    inputs: [
      {
        name: "_minRequestDuration",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "share",
    inputs: [],
    outputs: [{ name: "share_", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AssetSet",
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
    name: "RedeemMinRequestDurationSet",
    inputs: [
      {
        name: "minRequestDuration",
        type: "uint24",
        indexed: false,
        internalType: "uint24",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RedeemRequest",
    inputs: [
      {
        name: "controller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "requestId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "shares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RedeemRequestCanceled",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RedeemRequestExecuted",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "assetAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdraw",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "assets",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "shares",
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
    name: "ERC7540LikeIssuanceBase__SetAsset__AlreadySet",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__CancelRequest__MinRequestDurationNotElapsed",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__CancelRequest__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__ExecuteRedeemRequests__ZeroAssets",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__RequestRedeem__OwnerNotController",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__RequestRedeem__OwnerNotSender",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeRedeemQueue__RequestRedeem__ZeroShares",
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
