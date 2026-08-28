---
"@enzymefinance/onyx-environment": patch
"@enzymefinance/onyx-sdk": patch
---

Fix packaging bugs that broke strict ESM and CommonJS consumers (e.g. Vitest 4, Nest 11):

- `@enzymefinance/onyx-sdk`: relative imports in the published ESM build now carry explicit `.js` extensions, as required by Node's native ESM resolver.
- `@enzymefinance/onyx-environment`: removed the runtime import cycle between `contracts` and `releases` (the `Deployment` constant now lives in a dependency-free module and is re-exported unchanged), which left `Version` uninitialised when the package was loaded via CJS or under strict ESM.

The public API of both packages is unchanged.
