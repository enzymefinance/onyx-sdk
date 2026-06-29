export const TokenAdminRegistryAbi = [
  {
    type: "function",
    name: "getPool",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
] as const;
