export const AddressListsSharesTransferValidatorAbi = [
  {
    type: "function",
    name: "getRecipientList",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecipientListType",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSenderList",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSenderListType",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "RecipientListSet",
    inputs: [
      { name: "list", type: "address", indexed: false, internalType: "address" },
      {
        name: "listType",
        type: "uint8",
        indexed: false,
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SenderListSet",
    inputs: [
      { name: "list", type: "address", indexed: false, internalType: "address" },
      {
        name: "listType",
        type: "uint8",
        indexed: false,
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    anonymous: false,
  },
] as const;
