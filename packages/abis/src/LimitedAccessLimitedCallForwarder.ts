export const LimitedAccessLimitedCallForwarderAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "LIMITED_ACCESS_LIMITED_CALL_FORWARDER",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "LIMITED_ACCESS_LIMITED_CALL_FORWARDER_ID",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "OPEN_ACCESS_LIMITED_CALL_FORWARDER",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "OPEN_ACCESS_LIMITED_CALL_FORWARDER_ID",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addCall",
    inputs: [
      { name: "_target", type: "address", internalType: "address" },
      { name: "_selector", type: "bytes4", internalType: "bytes4" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addUser",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "canCall",
    inputs: [
      { name: "_target", type: "address", internalType: "address" },
      { name: "_selector", type: "bytes4", internalType: "bytes4" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeCalls",
    inputs: [
      {
        name: "_calls",
        type: "tuple[]",
        internalType: "struct OpenAccessLimitedCallForwarder.Call[]",
        components: [
          { name: "target", type: "address", internalType: "address" },
          { name: "data", type: "bytes", internalType: "bytes" },
          { name: "value", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [{ name: "returnData_", type: "bytes[]", internalType: "bytes[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "isUser",
    inputs: [{ name: "_who", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeCall",
    inputs: [
      { name: "_target", type: "address", internalType: "address" },
      { name: "_selector", type: "bytes4", internalType: "bytes4" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeUser",
    inputs: [{ name: "_user", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CallAdded",
    inputs: [
      {
        name: "target",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "selector",
        type: "bytes4",
        indexed: false,
        internalType: "bytes4",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CallExecuted",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: false,
        internalType: "address",
      },
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
    name: "CallRemoved",
    inputs: [
      {
        name: "target",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "selector",
        type: "bytes4",
        indexed: false,
        internalType: "bytes4",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserAdded",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserRemoved",
    inputs: [
      {
        name: "user",
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
    inputs: [{ name: "target", type: "address", internalType: "address" }],
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
  { type: "error", name: "FailedCall", inputs: [] },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "needed", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "LimitedAccessLimitedCallForwarder__AddUser__AlreadyAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "LimitedAccessLimitedCallForwarder__ExecuteCall__UnauthorizedUser",
    inputs: [],
  },
  {
    type: "error",
    name: "LimitedAccessLimitedCallForwarder__RemoveUser__NotAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "OpenAccessLimitedCallForwarder__AddCall__AlreadyAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "OpenAccessLimitedCallForwarder__ExecuteCall__UnauthorizedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "OpenAccessLimitedCallForwarder__RemoveCall__NotAdded",
    inputs: [],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
