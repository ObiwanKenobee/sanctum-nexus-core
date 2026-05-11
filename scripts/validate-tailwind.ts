/**
 * Validate Tailwind v4 + PostCSS configuration before running Vite.
 *
 * This compiles src/styles.css through the Tailwind v4 compiler so that any
 * CSS / Tailwind syntax error (missing braces, bad @theme blocks, malformed
 * @import, etc.) fails the CI step with a clear message instead of surfacing
 * later inside an opaque Vite build error.
 */
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "tailwindcss";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const entry = resolve(projectRoot, "src/styles.css");

async function main() {
  const css = await readFile(entry, "utf8");

  const compiler = await compile(css, {
    base: dirname(entry),
    loadStylesheet: async (id, base) => {
      const path = resolve(base, id);
      return { path, base: dirname(path), content: await readFile(path, "utf8") };
    },
  });

  // Force the candidate scan + CSS generation pipeline to actually run.
  compiler.build([]);

  console.log(`✓ Tailwind/PostCSS config OK (${entry})`);
}

main().catch((err) => {
  console.error("✗ Tailwind/PostCSS validation failed:");
  console.error(err?.stack ?? err);
  process.exit(1);
});