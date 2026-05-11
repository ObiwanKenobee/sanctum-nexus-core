#!/usr/bin/env node
/**
 * Convert an ESLint JSON report into GitHub Actions annotations
 * (`::error file=...,line=...,col=...::message`) so failures appear
 * inline in the PR diff and the workflow summary.
 *
 * Usage: node scripts/eslint-annotate.mjs <path-to-eslint-report.json>
 */
import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const reportPath = process.argv[2];
if (!reportPath) {
  console.error("Usage: eslint-annotate.mjs <report.json>");
  process.exit(2);
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch (err) {
  console.error(`Could not read ESLint report at ${reportPath}: ${err.message}`);
  process.exit(0); // don't mask the original ESLint exit code
}

const cwd = process.cwd();
let totalErrors = 0;
let totalWarnings = 0;

const escape = (s) =>
  String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");

for (const file of report) {
  const path = relative(cwd, resolve(file.filePath));
  for (const m of file.messages ?? []) {
    const level = m.severity === 2 ? "error" : "warning";
    if (level === "error") totalErrors++;
    else totalWarnings++;
    const line = m.line ?? 1;
    const col = m.column ?? 1;
    const rule = m.ruleId ? ` (${m.ruleId})` : "";
    const title = `ESLint${rule}`;
    process.stdout.write(
      `::${level} file=${escape(path)},line=${line},col=${col},title=${escape(title)}::${escape(m.message)}\n`,
    );
  }
}

process.stdout.write(
  `ESLint annotations: ${totalErrors} error(s), ${totalWarnings} warning(s)\n`,
);