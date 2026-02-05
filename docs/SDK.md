# Overview

The Onyx SDK is a TypeScript library for interacting with the Enzyme Onyx protocol - an Ethereum-based platform for decentralized on-chain asset management. This SDK provides tools for building depositor-facing interfaces and vault administration applications.

## Installation

Install the Onyx SDK and its peer dependencies using your preferred package manager:

```bash
pnpm add @enzymefinance/onyx-sdk
pnpm add @enzymefinance/onyx-environment @enzymefinance/onyx-abis viem
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

Set up a Viem client to interact with the blockchain:

```typescript
import { createPublicClient, createWalletClient, http, parseEventLogs } from "viem";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Public client for reading data
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Wallet client for sending transactions
const account = privateKeyToAccount("0x...");
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
```

## Depositor Actions

These are the primary actions for building depositor-facing interfaces (subscriptions and redemptions).

> **Note**: The addresses required below (deposit queue, redeem queue, shares contract) can be retrieved from the [Onyx API](https://api.onyx.enzyme.finance/reference) or your vault's configuration. Similarly, after submitting a deposit or redemption request, you can retrieve your request ID either by parsing the transaction receipt events (shown below) or by querying the API for your pending requests.
>
> **Controller vs Owner**: In deposit/redeem requests, `controller` is the address authorized to cancel the request, while `owner` is the address that will receive the shares (for deposits) or redeemed assets (for redemptions). These can be the same address.

### Approve Tokens

Before depositing, approve the deposit queue to spend your tokens:

```typescript
import * as Asset from "@enzymefinance/onyx-sdk/Asset";

// Check current allowance
const allowance = await Asset.getAllowance(publicClient, {
  asset: "0x...", // Token address (e.g., USDC)
  owner: "0x...", // Depositor address
  spender: "0x...", // Deposit queue address
});

// Approve if needed
const approveTransaction = Asset.approve({
  asset: "0x...",
  spender: "0x...", // Deposit queue address
  amount: 1000000n, // Amount to approve
});

const hash = await walletClient.writeContract(approveTransaction);

// Wait for approval to be confirmed before depositing
await publicClient.waitForTransactionReceipt({ hash });
```

### Request Deposit

Submit a deposit request to the queue:

```typescript
import * as Components from "@enzymefinance/onyx-sdk/Components";
import { ERC7540LikeDepositQueueAbi } from "@enzymefinance/onyx-abis";

const depositTransaction = Components.ERC7540LikeDepositQueue.requestDeposit({
  queueAddress: "0x...", // Deposit queue address
  amount: 1000000n, // Amount to deposit
  controller: "0x...", // Address that can cancel the request
  owner: "0x...", // Address that will receive shares
});

const hash = await walletClient.writeContract(depositTransaction);

// Get the request ID from the transaction receipt
const receipt = await publicClient.waitForTransactionReceipt({ hash });
const logs = parseEventLogs({
  abi: ERC7540LikeDepositQueueAbi,
  logs: receipt.logs,
  eventName: "DepositRequest",
});

if (logs.length === 0) {
  throw new Error("DepositRequest event not found");
}
const requestId = logs[0].args.requestId;
```

### Cancel Deposit

Cancel a pending deposit request.

> **Note**: A pending deposit request can only be cancelled after the queue's minimum request duration has elapsed. The contract stores a `canCancelTime` for each request; calling `cancelDeposit` before that time reverts with `MinRequestDurationNotElapsed`. Check whether a request is cancellable by fetching it with `getDepositRequest` and comparing `canCancelTime` to the current block timestamp.

```typescript
const cancelTransaction = Components.ERC7540LikeDepositQueue.cancelDeposit({
  queueAddress: "0x...",
  requestId: 1n, // ID of the deposit request
});

const hash = await walletClient.writeContract(cancelTransaction);
```

### Check Deposit Status

Query the status of a deposit request:

```typescript
const depositRequest = await Components.ERC7540LikeDepositQueue.getDepositRequest(
  publicClient,
  {
    queueAddress: "0x...",
    requestId: 1n,
  },
);
```

### Request Redemption

Submit a redemption request:

```typescript
import { ERC7540LikeRedeemQueueAbi } from "@enzymefinance/onyx-abis";

const redeemTransaction = Components.ERC7540LikeRedeemQueue.requestRedeem({
  queueAddress: "0x...", // Redeem queue address
  amount: 1000000000000000000n, // Amount of shares to redeem
  controller: "0x...", // Address that can cancel the request
  owner: "0x...", // Address that will receive the redeemed assets
});

const hash = await walletClient.writeContract(redeemTransaction);

// Get the request ID from the transaction receipt
const receipt = await publicClient.waitForTransactionReceipt({ hash });
const logs = parseEventLogs({
  abi: ERC7540LikeRedeemQueueAbi,
  logs: receipt.logs,
  eventName: "RedeemRequest",
});

if (logs.length === 0) {
  throw new Error("RedeemRequest event not found");
}
const requestId = logs[0].args.requestId;
```

### Cancel Redemption

Cancel a pending redemption request.

> **Note**: A pending redemption request can only be cancelled after the queue's minimum request duration has elapsed. The contract stores a `canCancelTime` for each request; calling `cancelRedeem` before that time reverts with `MinRequestDurationNotElapsed`. Check whether a request is cancellable by fetching it with `getRedeemRequest` and comparing `canCancelTime` to the current block timestamp.

```typescript
const cancelTransaction = Components.ERC7540LikeRedeemQueue.cancelRedeem({
  queueAddress: "0x...",
  requestId: 1n,
});

const hash = await walletClient.writeContract(cancelTransaction);
```

### Check Redemption Status

Query the status of a redemption request:

```typescript
const redeemRequest = await Components.ERC7540LikeRedeemQueue.getRedeemRequest(
  publicClient,
  {
    queueAddress: "0x...",
    requestId: 1n,
  },
);
```

### Read Share Balance and Price

Query fund share information:

```typescript
import * as Shares from "@enzymefinance/onyx-sdk/Shares";

// Get user's share balance
const balance = await Asset.getBalanceOf(publicClient, {
  owner: "0x...", // User address
  asset: "0x...", // Shares contract address
});

// Get current share price
const sharePrice = await Shares.sharePrice(publicClient, {
  sharesAddress: "0x...", // Shares contract address
});

// Get total supply
const totalSupply = await Asset.getTotalSupply(publicClient, {
  asset: "0x...", // Shares contract address
});
```

## Admin Actions

These actions are for vault admins to configure and administer funds.

### Get Network Environment

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
```

### Execute Deposit Requests

Process pending deposit requests:

```typescript
const executeTransaction = Components.ERC7540LikeDepositQueue.executeDepositRequests({
  queueAddress: "0x...",
  requestIds: [1n, 2n, 3n], // IDs of requests to execute
});

const hash = await walletClient.writeContract(executeTransaction);
```

### Execute Redemption Requests

Process pending redemption requests:

```typescript
const executeTransaction = Components.ERC7540LikeRedeemQueue.executeRedeemRequests({
  queueAddress: "0x...",
  requestIds: [1n, 2n],
});

const hash = await walletClient.writeContract(executeTransaction);
```

### Configure Fees

Set up fund fees:

```typescript
// Set entrance fee
const entranceFeeTransaction = Components.FeeHandler.setEntranceFee({
  feeHandlerAddress: "0x...",
  feeBps: 50, // 0.5%
  recipient: "0x...",
});

// Set management fee rate
const managementFeeTransaction = Components.ContinuousFlatRateManagementFeeTracker.setRate({
  tracker: "0x...",
  feeBps: 200, // 2% annual
});

// Set performance fee rate
const performanceFeeTransaction = Components.ContinuousFlatRatePerformanceFeeTracker.setRate({
  tracker: "0x...",
  feeBps: 2000, // 20%
});
```

### Manage Deposit Allowlist

Control who can deposit:

```typescript
// Add address to allowlist
const addTransaction = Components.ERC7540LikeDepositQueue.addAllowedController({
  queueAddress: "0x...",
  allowedControllerAddress: "0x...",
});

// Remove address from allowlist
const removeTransaction = Components.ERC7540LikeDepositQueue.removeAllowedController({
  queueAddress: "0x...",
  allowedControllerAddress: "0x...",
});

// Set deposit restriction mode
const { DepositRestriction } = Components.ERC7540LikeDepositQueue;
const restrictionTransaction = Components.ERC7540LikeDepositQueue.setDepositRestriction({
  queueAddress: "0x...",
  depositRestriction: DepositRestriction.ControllerAllowlist, // or DepositRestriction.None
});
```

### Update Valuations

Update asset prices and share value:

```typescript
const updateTransaction = Components.ValuationHandler.setAssetRatesThenUpdateShareValue({
  valuationHandlerAddress: "0x...",
  assetRateInput: [
    {
      asset: "0x...", // Asset address
      rate: 1000000n, // Price in value asset terms
      expiry: Math.floor(Date.now() / 1000) + 3600, // Rate expiry timestamp
    },
  ],
  untrackedPositionsValue: 0n, // Value of any untracked positions
});

const hash = await walletClient.writeContract(updateTransaction);
```

## TypeScript Support

The SDK is built with TypeScript and provides full type safety:

```typescript
import type { Address } from "viem";
import * as Asset from "@enzymefinance/onyx-sdk/Asset";
import * as Components from "@enzymefinance/onyx-sdk/Components";

// All addresses are typed
const asset: Address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const owner: Address = "0x...";

// Function parameters are fully typed
const tx = Components.ERC7540LikeDepositQueue.requestDeposit({
  queueAddress: "0x..." as Address,
  amount: 1000000n,
  controller: owner,
  owner: owner,
});
```

## Common Patterns

### Transaction Simulation

Before sending transactions, simulate them to catch errors:

```typescript
const transaction = Asset.approve({
  asset: "0x...",
  spender: "0x...",
  amount: 1000000n,
});

// Simulate first
const { result } = await publicClient.simulateContract(transaction);

// Then execute
const hash = await walletClient.writeContract(transaction);
```

### Batch Operations

Use Promise.all for multiple read operations:

```typescript
const [balance, allowance, sharePrice] = await Promise.all([
  Asset.getBalanceOf(publicClient, { owner: "0x...", asset: "0x..." }),
  Asset.getAllowance(publicClient, {
    owner: "0x...",
    spender: "0x...",
    asset: "0x...",
  }),
  Shares.sharePrice(publicClient, { sharesAddress: "0x..." }),
]);
```

---

_This SDK is under active development. APIs may change between versions. Always check the changelog before upgrading._
