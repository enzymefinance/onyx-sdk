export const CreWorkflowConsumerAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_chainlinkKeystoneForwarder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_allowedWorkflowOwner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ALLOWED_WORKFLOW_OWNER",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "CHAINLINK_KEYSTONE_FORWARDER",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "CRE_WORKFLOW_CONSUMER_STORAGE_LOCATION",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "CRE_WORKFLOW_CONSUMER_STORAGE_LOCATION_ID",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllowedWorkflowId",
    inputs: [],
    outputs: [
      {
        name: "allowedWorkflowId_",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllowedWorkflowName",
    inputs: [],
    outputs: [
      {
        name: "allowedWorkflowName_",
        type: "bytes10",
        internalType: "bytes10",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLimitedAccessLimitedCallForwarder",
    inputs: [],
    outputs: [
      {
        name: "limitedAccessLimitedCallForwarder_",
        type: "address",
        internalType: "contract LimitedAccessLimitedCallForwarder",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
    inputs: [
      {
        name: "_allowedWorkflowName",
        type: "bytes10",
        internalType: "bytes10",
      },
      {
        name: "_limitedAccessLimitedCallForwarder",
        type: "address",
        internalType: "contract LimitedAccessLimitedCallForwarder",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onReport",
    inputs: [
      { name: "_metadata", type: "bytes", internalType: "bytes" },
      { name: "_report", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAllowedWorkflowId",
    inputs: [
      {
        name: "_allowedWorkflowId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "_interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "supported_", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "event",
    name: "AllowedWorkflowIdSet",
    inputs: [
      {
        name: "allowedWorkflowId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AllowedWorkflowNameSet",
    inputs: [
      {
        name: "allowedWorkflowName",
        type: "bytes10",
        indexed: false,
        internalType: "bytes10",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LimitedAccessLimitedCallForwarderSet",
    inputs: [
      {
        name: "limitedAccessLimitedCallForwarder",
        type: "address",
        indexed: false,
        internalType: "contract LimitedAccessLimitedCallForwarder",
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
    name: "CreWorkflowConsumer__Init__AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "CreWorkflowConsumer__Init__EmptyLimitedAccessLimitedCallForwarder",
    inputs: [],
  },
  {
    type: "error",
    name: "CreWorkflowConsumer__OnReport__InvalidOnReportSender",
    inputs: [],
  },
  {
    type: "error",
    name: "CreWorkflowConsumer__OnReport__InvalidWorkflowId",
    inputs: [],
  },
  {
    type: "error",
    name: "CreWorkflowConsumer__OnReport__InvalidWorkflowName",
    inputs: [],
  },
  {
    type: "error",
    name: "CreWorkflowConsumer__OnReport__InvalidWorkflowOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "StorageHelpersLib__VerifyErc7201Location__Mismatch",
    inputs: [],
  },
] as const;
