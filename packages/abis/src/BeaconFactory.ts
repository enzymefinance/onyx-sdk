export const BeaconFactoryAbi = [
  {
    type: "constructor",
    inputs: [{ name: "_global", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "GLOBAL",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract Global" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deployProxy",
    inputs: [{ name: "_initData", type: "bytes", internalType: "bytes" }],
    outputs: [{ name: "proxy_", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "implementation",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isInstance",
    inputs: [{ name: "_who", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setImplementation",
    inputs: [
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ImplementationSet",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProxyDeployed",
    inputs: [
      {
        name: "proxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "Create2EmptyBytecode", inputs: [] },
  { type: "error", name: "FailedDeployment", inputs: [] },
  {
    type: "error",
    name: "GlobalOwnable__OnlyOwner__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
    ],
  },
] as const;
