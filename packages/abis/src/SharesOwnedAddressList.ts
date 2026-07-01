export const SharesOwnedAddressListAbi = [
  {
    type: "function",
    name: "addToList",
    inputs: [{ name: "_items", type: "address[]", internalType: "address[]" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAuth",
    inputs: [{ name: "_who", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isInList",
    inputs: [{ name: "_item", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeFromList",
    inputs: [{ name: "_items", type: "address[]", internalType: "address[]" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ItemAdded",
    inputs: [
      {
        name: "item",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ItemRemoved",
    inputs: [
      {
        name: "item",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "AddressList__AddToList__ItemAlreadyInList", inputs: [] },
  { type: "error", name: "AddressList__RemoveFromList__ItemNotInList", inputs: [] },
  { type: "error", name: "AddressList__Unauthorized", inputs: [] },
  { type: "error", name: "ComponentHelpersMixin__OnlyAdminOrOwner__Unauthorized", inputs: [] },
  { type: "error", name: "ComponentHelpersMixin__OnlyShares__Unauthorized", inputs: [] },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
