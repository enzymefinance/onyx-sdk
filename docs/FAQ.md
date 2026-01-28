# FAQ

Common questions about the Enzyme Onyx SDK and API.

---

## When should I use SDK vs API?

| Aspect | API | SDK |
|--------|-----|-----|
| **Read Data** | Indexed, cached, fast (~10s cache) | Direct RPC, real-time but slower |
| **Write Data** | Not supported | Full transaction support |
| **Historical Data** | Time-series financials, past deposits | Current state only |
| **Rate Limits** | ~100 RPM per IP | RPC provider limits |
| **Authentication** | None required | Wallet signature for writes |
| **Use Case** | Dashboards, analytics, read-heavy apps | Deposits, redemptions, admin actions |
| **Dependencies** | None (REST/fetch) | viem, wallet provider |
| **Offline Support** | Can cache responses | Requires live RPC |

**Recommendation:** Use a hybrid approach:
- **API** for reading vault data (metrics, deposits, history) - it's faster and doesn't count against RPC limits
- **SDK** for user transactions (deposits, redemptions, approvals) - required for blockchain writes

**Example Architecture:**

```
Your App
├── Display vault list → API (GET /vaults)
├── Show vault metrics → API (GET /vaults/{id})
├── Show user balance → API (GET /vaults/{id}/deposits/{wallet})
├── Request deposit → SDK (Components.ERC7540LikeDepositQueue.requestDeposit)
└── Approve tokens → SDK (Asset.approve)
```

---

## What networks are supported?

| Network | Chain ID |
|---------|----------|
| Ethereum Mainnet | 1 |
| Arbitrum One | 42161 |
| Base | 8453 |
| Plume Mainnet | 98865 |

---

## Do I need an API key?

**No.** The Onyx Public API requires no authentication. You can start making requests immediately.

Be mindful of rate limits (~100 requests per minute per IP).

---

## What's the rate limit?

The API is rate-limited at approximately **100 requests per minute** per IP address.

**Best Practices:**
- Cache responses where appropriate (vault config: 1 hour, financials: 10-60 seconds)
- Implement exponential backoff for retries
- Batch requests where possible (e.g., fetch vault collection instead of individual vaults)

**If you're rate limited (HTTP 429):**

```javascript
async function fetchWithBackoff(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url);
    if (response.status === 429) {
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
      continue;
    }
    return response;
  }
  throw new Error('Rate limit exceeded');
}
```

---

## How do I handle BigInt values from the API?

All token amounts in API responses are returned as **strings** to preserve precision (JavaScript numbers lose precision beyond 2^53).

**Correct:**
```javascript
const totalSupply = BigInt(response.financials.totalSupply);
```

**Incorrect:**
```javascript
const totalSupply = Number(response.financials.totalSupply); // Loses precision!
```

**Formatting for display:**
```javascript
function formatBigInt(value, decimals = 18, displayDecimals = 2) {
  const num = BigInt(value);
  const divisor = BigInt(10 ** decimals);
  const integerPart = num / divisor;
  const fractionalPart = num % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  return `${integerPart}.${fractionalStr.slice(0, displayDecimals)}`;
}
```

---

## How do I install the SDK?

```bash
npm install @enzymefinance/onyx-sdk @enzymefinance/onyx-environment @enzymefinance/onyx-abis viem
```

**Requirements:**
- Node.js 18+
- TypeScript 5.0+ (recommended)
- viem ^2.40.3

`@enzymefinance/onyx-environment`, `@enzymefinance/onyx-abis`, and `viem` are peer dependencies that must be installed alongside the main SDK package.

---

## How do I get started building on Onyx?

1. **Read the API documentation** at [api.onyx.enzyme.finance/reference](https://api.onyx.enzyme.finance/reference)
2. **Install the SDK** if you need transaction capabilities (see above)
3. **Start with a simple example** - fetch a vault and display its metrics:

```javascript
const response = await fetch('https://api.onyx.enzyme.finance/vaults/YOUR_VAULT_ID');
const vault = await response.json();
console.log(`${vault.name}: $${formatBigInt(vault.financials.netAssetValue)}`);
```

---

## Where can I find vault IDs?

Vault IDs are database identifiers (CUID format like `cm1abc2def3...`), not blockchain addresses. You can find them:

1. **From the URL** in the Onyx depositor app
2. **Via API** using the vault collections endpoint
3. **From your organization's dashboard** if you're a vault manager

---

## Transaction Errors

### Transaction simulation failed

Simulation errors occur when the transaction would fail on-chain. Common causes:

1. **Insufficient balance** - Check you have enough tokens and ETH/native token for gas
2. **Insufficient allowance** - Approve the deposit queue to spend your tokens first
3. **Deposit queue restrictions** - Your address may not be on the allowlist
4. **Vault is paused or closed** - The vault may not be accepting deposits

Look for revert reasons like:
- `"ERC20: insufficient allowance"` - Need to approve first
- `"ERC20: transfer amount exceeds balance"` - Not enough tokens
- `"Controller not in allowlist"` - Address not whitelisted

### Insufficient allowance

Before depositing, you must approve the deposit queue contract to spend your tokens.

**Two-step process:**

```javascript
import * as Asset from '@enzymefinance/onyx-sdk/Asset';
import * as Components from '@enzymefinance/onyx-sdk/Components';

// Step 1: Check current allowance
const allowance = await Asset.getAllowance(client, {
  asset: tokenAddress,
  owner: userAddress,
  spender: depositQueueAddress,
});

// Step 2: Approve if needed
if (allowance < depositAmount) {
  const approveTx = Asset.approve({
    asset: tokenAddress,
    spender: depositQueueAddress,
    amount: depositAmount,
  });
  await walletClient.writeContract(approveTx);
}

// Step 3: Deposit
const depositTx = Components.ERC7540LikeDepositQueue.requestDeposit({
  queueAddress: depositQueueAddress,
  amount: depositAmount,
  controller: userAddress,
  owner: userAddress,
});
await walletClient.writeContract(depositTx);
```

### Gas estimation errors

Gas estimation can fail when the underlying operation would revert, during network congestion, or for complex transactions.

**Workaround:** Set a manual gas limit:
```javascript
const hash = await walletClient.writeContract({
  ...tx,
  gas: 300000n,
});
```

### SDK transaction not working

Common issues:

1. **Wrong client type** - Read operations need a `PublicClient`, write operations need a `WalletClient`
2. **Missing account** - Ensure the wallet client has an account connected
3. **Simulation not called** - Always simulate before sending to catch errors early

**Correct pattern:**
```javascript
import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import * as Asset from '@enzymefinance/onyx-sdk/Asset';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
  account: userAddress,
});

// Build transaction
const tx = Asset.approve({
  asset: tokenAddress,
  spender: spenderAddress,
  amount: 1000000n,
});

// Simulate first
const { result } = await publicClient.simulateContract(tx);

// Send transaction
const hash = await walletClient.writeContract(tx);
```

---

## Getting Help

1. **API docs:** [api.onyx.enzyme.finance/reference](https://api.onyx.enzyme.finance/reference)
2. **SDK docs:** [SDK](SDK.md)
3. **Discord:** [Enzyme Finance Discord](https://discord.gg/enzyme)
4. **GitHub:** [github.com/enzymefinance](https://github.com/enzymefinance)
