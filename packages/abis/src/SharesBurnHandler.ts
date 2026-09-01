export const SharesBurnHandlerAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "_inputs",
        type: "tuple[]",
        internalType: "struct SharesBurnHandler.BurnInput[]",
        components: [
          {
            name: "from",
            type: "address",
            internalType: "address",
          },
          {
            name: "sharesAmount",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPreBurnHook",
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
    name: "setPreBurnHook",
    inputs: [
      {
        name: "_preBurnHook",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "PreBurnHookSet",
    inputs: [
      {
        name: "hook",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesBurned",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "from",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "SharesBurnHandler__Burn__ZeroShares",
    inputs: [],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
