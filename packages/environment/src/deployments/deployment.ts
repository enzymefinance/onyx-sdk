/**
 * Deployment identifiers.
 *
 * This module is intentionally a leaf (no imports) so that `contracts.ts` and `releases.ts`
 * can both depend on it without depending on each other. Keeping the runtime import graph
 * acyclic matters for CommonJS consumers (a cycle yields partially-initialised exports) and
 * for strict ESM environments.
 */
export const Deployment = {
  ARBITRUM: "arbitrum",
  BASE: "base",
  BASE_SEPOLIA: "base-sepolia",
  ETHEREUM: "ethereum",
  MEGAETH: "megaeth",
  PLUME: "plume",
  RAYLS: "rayls",
  SEPOLIA: "sepolia",
} as const;

export type DeploymentType = (typeof Deployment)[keyof typeof Deployment];
