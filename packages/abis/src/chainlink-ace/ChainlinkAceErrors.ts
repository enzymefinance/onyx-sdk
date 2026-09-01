export const ChainlinkAceErrorsAbi = [
  {
    type: "error",
    name: "ExtractorError",
    inputs: [
      {
        name: "extractor",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "payload",
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
  },
  {
    type: "error",
    name: "PolicyActionError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
    ],
  },
  {
    type: "error",
    name: "PolicyConfigurationError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
    ],
  },
  {
    type: "error",
    name: "PolicyConfigurationVersionError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "expectedVersion",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "actualVersion",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PolicyEngineUndefined",
    inputs: [],
  },
  {
    type: "error",
    name: "PolicyMapperError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "payload",
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
  },
  {
    type: "error",
    name: "PolicyPostRunError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "payload",
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
  },
  {
    type: "error",
    name: "PolicyRejected",
    inputs: [
      {
        name: "rejectReason",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "PolicyRunError",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "errorReason",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "payload",
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
  },
  {
    type: "error",
    name: "PolicyRunRejected",
    inputs: [
      {
        name: "policy",
        type: "address",
        internalType: "address",
      },
      {
        name: "rejectReason",
        type: "string",
        internalType: "string",
      },
      {
        name: "payload",
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
  },
  {
    type: "error",
    name: "PolicyRunUnauthorizedError",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "TargetAlreadyAttached",
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
    name: "TargetNotAttached",
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
    name: "UnsupportedSelector",
    inputs: [
      {
        name: "selector",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidPermit",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidSignature",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "PermitExpired",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "expiration",
        type: "uint48",
        internalType: "uint48",
      },
    ],
  },
  {
    type: "error",
    name: "IssuerAllowedAlreadySet",
    inputs: [
      {
        name: "issuerKey",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "allowed",
        type: "bool",
        internalType: "bool",
      },
    ],
  },
  {
    type: "error",
    name: "PermitAlreadyPresented",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "PermitAlreadyRevoked",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "PermitAlreadyUsed",
    inputs: [
      {
        name: "permitId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "maxUses",
        type: "uint64",
        internalType: "uint64",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidSignatureFormat",
    inputs: [
      {
        name: "error",
        type: "uint8",
        internalType: "enum ECDSA.RecoverError",
      },
      {
        name: "errArg",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "ChainlinkAceIssuanceValidatorBase__Init__EmptyHandler",
    inputs: [],
  },
  {
    type: "error",
    name: "ChainlinkAceIssuanceValidatorBase__OnlyHandler",
    inputs: [],
  },
  {
    type: "error",
    name: "ChainlinkAcePolicyProtectedBase__AuthorizeAttachPolicyEngine__Unauthorized",
    inputs: [],
  },
] as const;
