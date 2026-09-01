export const Deployment = {
  ARBITRUM: "arbitrum",
  BASE: "base",
  BASE_SEPOLIA: "base-sepolia",
  BSC: "bsc",
  ETHEREUM: "ethereum",
  MEGAETH: "megaeth",
  PLUME: "plume",
  RAYLS: "rayls",
  SEPOLIA: "sepolia",
} as const;

export type DeploymentType = (typeof Deployment)[keyof typeof Deployment];
