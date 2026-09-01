export const ChainlinkAceSharesMintHandlerPreMintExtractorAbi = [
  {
    type: "function",
    name: "PARAM_ORIGINATOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PARAM_SHARES_AMOUNT",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PARAM_TO",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "extract",
    inputs: [
      {
        name: "_payload",
        type: "tuple",
        internalType: "struct IPolicyEngine.Payload",
        components: [
          {
            name: "selector",
            type: "bytes4",
            internalType: "bytes4",
          },
          {
            name: "sender",
            type: "address",
            internalType: "address",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "context",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IPolicyEngine.Parameter[]",
        components: [
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "value",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "typeAndVersion",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "UnsupportedSelector",
    inputs: [
      {
        name: "selector",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
  },
] as const;
