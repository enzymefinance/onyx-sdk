export const AccountERC20TrackerAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "addAsset",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAccount",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAssets",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPositionValue",
    inputs: [],
    outputs: [{ name: "value_", type: "int256", internalType: "int256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
    inputs: [{ name: "_account", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAsset",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeAsset",
    inputs: [{ name: "_asset", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AccountSet",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AssetAdded",
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
    name: "AssetRemoved",
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
    type: "error",
    name: "AccountERC20Tracker__AddAsset__AlreadyAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "AccountERC20Tracker__GetPositionValue__NotInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "AccountERC20Tracker__Init__AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "AccountERC20Tracker__Init__EmptyAccount",
    inputs: [],
  },
  {
    type: "error",
    name: "AccountERC20Tracker__RemoveAsset__NotAdded",
    inputs: [],
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
    name: "SafeCastOverflowedUintToInt",
    inputs: [{ name: "value", type: "uint256", internalType: "uint256" }],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
