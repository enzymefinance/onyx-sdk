# Overview

The Onyx SDK is a TypeScript library for interacting with the Enzyme Onyx protocol - an Ethereum-based platform for decentralized on-chain asset management. This SDK provides a comprehensive set of tools for building applications that manage digital assets, create investment funds, and implement sophisticated DeFi strategies.

## Installation

Install the Onyx SDK and its peer dependencies using your preferred package manager:

```bash
# npm
npm install @enzymefinance/onyx-sdk

# Install peer dependencies
npm install @enzymefinance/onyx-environment @enzymefinance/onyx-abis viem

```

> **Note**: `@enzymefinance/onyx-environment`, `@enzymefinance/onyx-abis`, and `viem` are peer dependencies that must be installed alongside the main SDK package.

## Prerequisites

- Node.js 18 or later
- TypeScript 5.0 or later
- Basic understanding of Ethereum and smart contracts
- Familiarity with [Viem](https://viem.sh) (the underlying Ethereum client library)

## Supported Networks

The Onyx SDK supports the following networks:

- **Ethereum Mainnet** (Chain ID: 1)
- **Arbitrum** (Chain ID: 42161)
- **Base** (Chain ID: 8453)
- **Plume** (Chain ID: 98866)

For deployed contract addresses on each network, see [Contract Addresses](https://docs.enzyme.finance/onyx-protocol/contract-addresses).

## Quick Start

### 1. Set up a Viem Client

First, create a Viem client to interact with the blockchain:

```typescript
import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Public client for reading data
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Wallet client for sending transactions (optional)
const account = privateKeyToAccount("0x...");
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
```

### 2. Get Network Environment

Use the environment package to get deployment addresses and configurations:

```typescript
import {
  Network,
  getEnvironmentGroup,
  Deployment,
} from "@enzymefinance/onyx-environment";

// Get the environment for Ethereum mainnet
const environmentGroup = getEnvironmentGroup(Deployment.ETHEREUM);
const environment = environmentGroup.getEnvironment();

// Access deployed contract addresses
const globalAddress = environment.contracts.global.address;

// Access deployed contract addresses from the environment
```

### 3. Basic Asset Operations

Work with ERC20 tokens and get asset information:

```typescript
import * as Asset from "@enzymefinance/onyx-sdk/Asset";

// Get asset information
const assetInfo = await Asset.getInfo(publicClient, {
  asset: "0xA0b86a33E6441c8C06DD2b7c94b7E0e2d8b6b8c1", // USDC address
});

console.log(assetInfo); // { name: 'USD Coin', symbol: 'USDC', decimals: 6 }

// Get asset balance
const balance = await Asset.getBalanceOf(publicClient, {
  owner: "0x...",
  asset: "0xA0b86a33E6441c8C06DD2b7c94b7E0e2d8b6b8c1",
});

// Approve asset spending
const approveTransaction = Asset.approve({
  asset: "0xA0b86a33E6441c8C06DD2b7c94b7E0e2d8b6b8c1",
  spender: "0x...",
  amount: 1000000n, // 1 USDC (6 decimals)
});
```

### 4. Deploy Shares (Fund Tokens)

Create a new fund by deploying shares:

```typescript
import * as Shares from "@enzymefinance/onyx-sdk/Shares";
import { encodeValueAsset } from "@enzymefinance/onyx-environment";

const deploySharesTransaction = Shares.deployShares({
  sharesFactoryAddress: environment.contracts.sharesFactory.address,
  owner: "0x...", // Your address
  name: "My Investment Fund",
  symbol: "MIF",
  valueAsset: {
    type: "erc20",
    token: "0xA0b86a33E6441c8C06DD2b7c94b7E0e2d8b6b8c1", // USDC as base asset
  },
});

// Execute the transaction using your wallet client
const hash = await walletClient.writeContract(deploySharesTransaction);
```

### 5. Working with Components

The SDK provides various components for fund management:

```typescript
import * as Components from "@enzymefinance/onyx-sdk/Components";

// Add a position tracker to monitor ERC20 holdings
const addTrackerTransaction = Components.AccountERC20Tracker.addAsset({
  trackerAddress: "0x...",
  asset: "0x...", // Asset to track
});

// Set up deposit queue for fund subscriptions
const requestDepositTransaction =
  Components.ERC7540LikeDepositQueue.requestDeposit({
    queueAddress: "0x...",
    amount: 1000000n,
    controller: "0x...",
    owner: "0x...",
  });

// Configure management fees
const setFeeTransaction =
  Components.ContinuousFlatRateManagementFeeTracker.setRate({
    tracker: "0x...",
    feeBps: 200, // 2% annual management fee
  });
```

### 6. Reading Fund Data

Query information about existing funds:

```typescript
// Get shares information
const sharesInfo = await Asset.getInfo(publicClient, {
  asset: "0x...", // Shares contract address
});

// Get total supply of fund shares
const totalSupply = await Asset.getTotalSupply(publicClient, {
  asset: "0x...",
});

// Get user's share balance
const userShares = await Asset.getBalanceOf(publicClient, {
  owner: "0x...",
  asset: "0x...",
});
```

## TypeScript Support

The SDK is built with TypeScript and provides full type safety:

```typescript
import type { Address } from "viem";
import type { DeploySharesProxyParams } from "@enzymefinance/onyx-sdk/Shares";

const params: DeploySharesProxyParams = {
  sharesFactoryAddress: "0x..." as Address,
  owner: "0x..." as Address,
  name: "My Fund",
  symbol: "MF",
  valueAsset: {
    type: "erc20",
    token: "0x..." as Address,
  },
};
```

## Common Patterns

### Transaction Simulation

Before sending transactions, simulate them to catch errors:

```typescript
import { simulateContract } from "viem/actions";

const transaction = Asset.approve({
  asset: "0x...",
  spender: "0x...",
  amount: 1000000n,
});

// Simulate first
const { result } = await simulateContract(publicClient, transaction);

// Then execute
const hash = await walletClient.writeContract(transaction);
```

### Batch Operations

Use Promise.all for multiple read operations:

```typescript
const [balance1, balance2, allowance] = await Promise.all([
  Asset.getBalanceOf(publicClient, { owner: "0x...", asset: "0x..." }),
  Asset.getBalanceOf(publicClient, { owner: "0x...", asset: "0x..." }),
  Asset.getAllowance(publicClient, {
    owner: "0x...",
    spender: "0x...",
    asset: "0x...",
  }),
]);
```

## Support

If you encounter issues or have questions:

1. Check the [GitHub Issues](https://github.com/enzymefinance/onyx-sdk/issues)
2. Start a [Discussion on GitHub](https://github.com/enzymefinance/onyx-sdk/discussions)

---

_This SDK is under active development. APIs may change between versions. Always check the changelog before upgrading._
