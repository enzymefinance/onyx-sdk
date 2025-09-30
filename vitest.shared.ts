import * as path from "node:path";
import type { ViteUserConfig } from "vitest/config";

const alias = (pkg: string) => {
  const name = `@onyx/${pkg}`;
  const target = process.env.TEST_DIST !== undefined ? "dist/dist/esm" : "src";
  return {
    [`${name}/test`]: path.join(__dirname, "packages", pkg, "test", "setup.js"),
    [`${name}`]: path.join(__dirname, "packages", pkg, target),
  };
};

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: ViteUserConfig = {
  esbuild: {
    target: "es2020",
  },

  test: {
    testTimeout: 200_000,
    include: ["test/**/*.test.ts"],
    projects: ["./packages/sdk", "./packages/environment"],
    alias: {
      ...alias("abis"),
      ...alias("environment"),
      ...alias("sdk"),
    },
  },
};

export default config;
