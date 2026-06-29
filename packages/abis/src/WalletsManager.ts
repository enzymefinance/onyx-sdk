export const WalletsManagerAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_ccipRouter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_depositorWalletsFactory",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DEPOSITOR_WALLETS_FACTORY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract DeterministicBeaconFactory",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "batchSendTokensViaCCIP",
    inputs: [
      {
        name: "_params",
        type: "tuple[]",
        internalType: "struct WalletsManager.BatchSendParams[]",
        components: [
          {
            name: "wallet",
            type: "address",
            internalType: "address",
          },
          {
            name: "tokens",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "extraArgs",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "ccipReceive",
    inputs: [
      {
        name: "message",
        type: "tuple",
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "sender",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "destTokenAmounts",
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
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "computeWalletAddress",
    inputs: [
      {
        name: "_sourceChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_user",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "wallet_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRouter",
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
    name: "processMessageData",
    inputs: [
      {
        name: "_wallet",
        type: "address",
        internalType: "address",
      },
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "event",
    name: "CCIPMessageProcessed",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "sourceChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "wallet",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "message",
        type: "tuple",
        indexed: false,
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "sender",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "destTokenAmounts",
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
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MessageDataProcessingFailed",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "wallet",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "reason",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
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
    name: "InvalidRouter",
    inputs: [
      {
        name: "router",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "WalletsManager__ProcessMessageData__OnlySelfCallAllowed",
    inputs: [],
  },
] as const;
