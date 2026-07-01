export const TokenPoolAbi = [
  {
    type: "function",
    name: "getRemoteToken",
    inputs: [{ name: "remoteChainSelector", type: "uint64", internalType: "uint64" }],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isSupportedChain",
    inputs: [{ name: "remoteChainSelector", type: "uint64", internalType: "uint64" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
] as const;
