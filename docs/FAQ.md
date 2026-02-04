# FAQ

Common questions about the Enzyme Onyx SDK and API.

---

## When should I use SDK vs API?

| Aspect              | API                                    | SDK                                  |
| ------------------- | -------------------------------------- | ------------------------------------ |
| **Read Data**       | Indexed, cached, fast (~10s cache)     | Direct RPC, real-time but slower     |
| **Write Data**      | Not supported                          | Full transaction support             |
| **Historical Data** | Time-series financials, past deposits  | Current state only                   |
| **Rate Limits**     | Per IP (capacity reviewed regularly)   | RPC provider limits                  |
| **Authentication**  | None required                          | Wallet signature for writes          |
| **Use Case**        | Dashboards, analytics, read-heavy apps | Deposits, redemptions, admin actions |
| **Dependencies**    | None (REST/fetch)                      | viem, wallet provider, RPC           |
| **Offline Support** | Can cache responses                    | Requires live RPC                    |

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

| Network          | Chain ID |
| ---------------- | -------- |
| Ethereum Mainnet | 1        |
| Arbitrum One     | 42161    |
| Base             | 8453     |
| Plume Mainnet    | 98866    |

---

## Do I need an API key?

**No.** The Onyx Public API requires no authentication. You can start making requests immediately.

---

## What's the rate limit?

The API is rate-limited per IP address. Capacity is reviewed regularly.
