export const PushSplitFactoryAbi = [
  {
    type: "function",
    name: "createSplit",
    inputs: [
      {
        name: "_splitParams",
        type: "tuple",
        components: [
          { name: "recipients", type: "address[]" },
          { name: "allocations", type: "uint256[]" },
          { name: "totalAllocation", type: "uint256" },
          { name: "distributionIncentive", type: "uint16" },
        ],
      },
      { name: "_owner", type: "address" },
      { name: "_creator", type: "address" },
    ],
    outputs: [{ name: "split", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "SplitCreated",
    inputs: [
      { name: "split", type: "address", indexed: true },
      {
        name: "splitParams",
        type: "tuple",
        indexed: false,
        components: [
          { name: "recipients", type: "address[]" },
          { name: "allocations", type: "uint256[]" },
          { name: "totalAllocation", type: "uint256" },
          { name: "distributionIncentive", type: "uint16" },
        ],
      },
      { name: "owner", type: "address", indexed: false },
      { name: "creator", type: "address", indexed: false },
      { name: "nonce", type: "uint256", indexed: false },
    ],
  },
] as const;
