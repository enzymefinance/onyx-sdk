#!/usr/bin/env node
// biome-ignore-all lint/suspicious/noConsole: CLI script, console output is the interface

/**
 * Smoke-check the built `dist/` of one or more packages by loading every export target the
 * way a real consumer would:
 *
 *  - every `import` target through Node's native ESM resolver (no bundler, no
 *    `moduleResolution: node` leniency), which rejects extensionless relative specifiers;
 *  - every `default` (CJS) target through `require()`.
 *
 * Both loaders fully evaluate the module graph, so this also catches runtime import cycles
 * that leave exports partially initialised (the class of bug that breaks CJS consumers such
 * as Nest and strict ESM runners such as Vitest).
 *
 * Usage: node scripts/check-esm-exports.mjs packages/sdk packages/environment
 */
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const packageDirs = process.argv.slice(2);

if (packageDirs.length === 0) {
  console.error("Usage: check-esm-exports.mjs <package-dir> [<package-dir> ...]");
  process.exit(2);
}

let failures = 0;
let checked = 0;

for (const packageDir of packageDirs) {
  const distDir = path.resolve(packageDir, "dist");
  const manifestPath = path.join(distDir, "package.json");

  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    console.error(`✖ ${packageDir}: cannot read ${manifestPath} (did you run \`pnpm build\`?)`);
    console.error(`  ${error.message}`);
    failures++;
    continue;
  }

  const require = createRequire(path.join(distDir, "noop.cjs"));
  const targets = collectTargets(manifest.exports ?? {});

  for (const { subpath, condition, target } of targets) {
    if (!/\.[cm]?js$/.test(target)) {
      continue;
    }

    const absolute = path.join(distDir, target);
    const label = `${manifest.name}${subpath === "." ? "" : subpath.slice(1)} [${condition}] → ${target}`;
    checked++;

    try {
      if (condition === "import") {
        await import(pathToFileURL(absolute).href);
      } else {
        require(absolute);
      }
      console.log(`✔ ${label}`);
    } catch (error) {
      failures++;
      console.error(`✖ ${label}`);
      console.error(indent(String(error?.stack ?? error)));
    }
  }
}

console.log(`\n${checked} export targets checked, ${failures} failed.`);
process.exit(failures === 0 ? 0 : 1);

function collectTargets(exportsField) {
  const targets = [];

  for (const [subpath, value] of Object.entries(exportsField)) {
    if (typeof value === "string") {
      targets.push({ subpath, condition: "default", target: value });
      continue;
    }

    for (const [condition, target] of Object.entries(value)) {
      if (condition === "types" || typeof target !== "string") {
        continue;
      }

      targets.push({ subpath, condition, target });
    }
  }

  return targets;
}

function indent(text) {
  return text
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}
