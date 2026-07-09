import * as path from "node:path";
import type { ViteUserConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const alias = (pkg: string) => {
  const legacyName = `@onyx/${pkg}`;
  const scopedName = `@enzymefinance/onyx-${pkg}`;
  const target = process.env.TEST_DIST !== undefined ? "dist/dist/esm" : "src";
  return {
    [`${legacyName}/test`]: path.join(__dirname, "packages", pkg, "test", "setup.js"),
    [`${legacyName}`]: path.join(__dirname, "packages", pkg, target),
    [`${scopedName}/test`]: path.join(__dirname, "packages", pkg, "test", "setup.js"),
    [`${scopedName}`]: path.join(__dirname, "packages", pkg, target),
  };
};

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: ViteUserConfig = {
  plugins: [tsconfigPaths()],
  esbuild: {
    target: "es2020",
  },
  resolve: {
    alias: {
      ...alias("abis"),
      ...alias("environment"),
      ...alias("sdk"),
    },
  },

  test: {
    testTimeout: 200_000,
    include: ["packages/*/test/**/*.test.ts"],
  },
};

export default config;
