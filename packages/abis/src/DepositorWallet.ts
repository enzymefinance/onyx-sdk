export const DepositorWalletAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_ccipRouter",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "CCIP_ROUTER",
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
    name: "buildTokenReturnMessage",
    inputs: [
      {
        name: "_tokens",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_extraArgs",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_feeToken",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "message_",
        type: "tuple",
        internalType: "struct Client.EVM2AnyMessage",
        components: [
          {
            name: "receiver",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "tokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "feeToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "extraArgs",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "fee_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeCalls",
    inputs: [
      {
        name: "_calls",
        type: "tuple[]",
        internalType: "struct DepositorWallet.Call[]",
        components: [
          {
            name: "target",
            type: "address",
            internalType: "address",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "value",
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
    name: "getChainSelector",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUser",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWalletsManager",
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
    name: "init",
    inputs: [
      {
        name: "_walletsManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_user",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_chainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendCCIPMessage",
    inputs: [
      {
        name: "_message",
        type: "tuple",
        internalType: "struct Client.EVM2AnyMessage",
        components: [
          {
            name: "receiver",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "tokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "feeToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "extraArgs",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "_feeValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "CCIPMessageSent",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "chainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "message",
        type: "tuple",
        indexed: false,
        internalType: "struct Client.EVM2AnyMessage",
        components: [
          {
            name: "receiver",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "tokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "feeToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "extraArgs",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CallExecuted",
    inputs: [
      {
        name: "target",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
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
    name: "ChainSelectorSet",
    inputs: [
      {
        name: "chainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserSet",
    inputs: [
      {
        name: "user",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WalletsManagerSet",
    inputs: [
      {
        name: "walletsManager",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "DepositorWallet__OnlyWalletsManager__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
