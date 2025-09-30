export const ERC7540LikeDepositQueueAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "addAllowedController",
    inputs: [{ name: "_controller", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "asset",
    inputs: [],
    outputs: [{ name: "asset_", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cancelDeposit",
    inputs: [{ name: "_requestId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "assets_", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeDepositRequests",
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
    name: "getDepositLastId",
    inputs: [],
    outputs: [{ name: "requestId_", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDepositMinRequestDuration",
    inputs: [],
    outputs: [{ name: "", type: "uint24", internalType: "uint24" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDepositRequest",
    inputs: [{ name: "_requestId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ERC7540LikeDepositQueue.DepositRequestInfo",
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
            name: "assetAmount",
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
    name: "getDepositRestriction",
    inputs: [],
    outputs: [
      {
        name: "restriction_",
        type: "uint8",
        internalType: "enum ERC7540LikeDepositQueue.DepositRestriction",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isInAllowedControllerList",
    inputs: [{ name: "_who", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeAllowedController",
    inputs: [{ name: "_controller", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestDeposit",
    inputs: [
      { name: "_assets", type: "uint256", internalType: "uint256" },
      { name: "_controller", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "requestId_", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestDepositReferred",
    inputs: [
      { name: "_assets", type: "uint256", internalType: "uint256" },
      { name: "_controller", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" },
      { name: "_referrer", type: "bytes32", internalType: "bytes32" },
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
    name: "setDepositMinRequestDuration",
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
    name: "setDepositRestriction",
    inputs: [
      {
        name: "_restriction",
        type: "uint8",
        internalType: "enum ERC7540LikeDepositQueue.DepositRestriction",
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
    name: "AllowedControllerAdded",
    inputs: [
      {
        name: "controller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AllowedControllerRemoved",
    inputs: [
      {
        name: "controller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
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
    name: "Deposit",
    inputs: [
      {
        name: "sender",
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
    type: "event",
    name: "DepositMinRequestDurationSet",
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
    name: "DepositRequest",
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
        name: "assets",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DepositRequestCanceled",
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
    name: "DepositRequestExecuted",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DepositRequestReferred",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "referrer",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DepositRestrictionSet",
    inputs: [
      {
        name: "restriction",
        type: "uint8",
        indexed: false,
        internalType: "enum ERC7540LikeDepositQueue.DepositRestriction",
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
    name: "ERC7540LikeDepositQueue__CancelRequest__MinRequestDurationNotElapsed",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__CancelRequest__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__ExecuteDepositRequests__ZeroShares",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__RequestDeposit__ControllerNotAllowed",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__RequestDeposit__OwnerNotController",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__RequestDeposit__OwnerNotSender",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeDepositQueue__RequestDeposit__ZeroAssets",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC7540LikeIssuanceBase__SetAsset__AlreadySet",
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
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
