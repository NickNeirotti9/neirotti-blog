#!/usr/bin/env node
/*
 * Turns the Markdown files in content/ into src/generated/*.json.
 * Runs automatically before `npm start` and `npm run build`; run it by hand
 * with `npm run content`. Pass --production to leave drafts out and to fail
 * on any error (that is what the deploy build does).
 */
const lib = require("./content-lib.cjs");

const production =
  process.argv.includes("--production") || process.env.NODE_ENV === "production";

const result = lib.writeGenerated({ production });

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const summary =
  `[content] ${plural(result.posts, "post")}, ${plural(result.portfolio, "portfolio item")} -> src/generated/` +
  (result.draftsSkipped ? ` (${plural(result.draftsSkipped, "draft")} left out)` : "");

if (result.errors.length) {
  const line = "=".repeat(72);
  console.error(`\n${line}\n[content] ${plural(result.errors.length, "problem")} found:\n`);
  for (const e of result.errors) console.error(`  - ${e}`);
  console.error(`\n${line}`);
  if (production) {
    console.error("[content] Fix the problems above, then build again.\n");
    process.exit(1);
  }
  console.error("[content] The files above were skipped. Fix them and they will be picked up automatically.\n");
}
console.log(summary);
