export const AddressListsSharesTransferValidatorAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getRecipientList",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
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
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
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
    type: "function",
    name: "setRecipientList",
    inputs: [
      {
        name: "_list",
        type: "address",
        internalType: "address",
      },
      {
        name: "_listType",
        type: "uint8",
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSenderList",
    inputs: [
      {
        name: "_list",
        type: "address",
        internalType: "address",
      },
      {
        name: "_listType",
        type: "uint8",
        internalType: "enum AddressListsSharesTransferValidator.ListType",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validateSharesTransfer",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "_from",
        type: "address",
        internalType: "address",
      },
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "RecipientListSet",
    inputs: [
      {
        name: "list",
        type: "address",
        indexed: false,
        internalType: "address",
      },
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
      {
        name: "list",
        type: "address",
        indexed: false,
        internalType: "address",
      },
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
    name: "SharesTransferValidator__ValidateSetList__InvalidTypeForList",
    inputs: [],
  },
  {
    type: "error",
    name: "SharesTransferValidator__ValidateSharesTransfer__RecipientNotAllowed",
    inputs: [],
  },
  {
    type: "error",
    name: "SharesTransferValidator__ValidateSharesTransfer__SenderNotAllowed",
    inputs: [],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
