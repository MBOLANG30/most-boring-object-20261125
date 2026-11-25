// The Most Boring Object, Reviewed in One Line
// Entry: a one-line review of a doorstop — the dullest everyday object in
// the house — written to /output/entry.txt for the make.fun judge.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review. One line, funny because it is true: a doorstop's whole job is
// to lie on the floor doing nothing, and precisely because it does nothing,
// it is the one thing in the house that never breaks, never complains, and
// never disappoints — unlike everything else you actually paid attention to.
const REVIEW: string =
  "Five stars: my doorstop has spent three years lying on the floor doing nothing, and it is the only thing in my house that has never disappointed me.";

const OUT_DIR: string = "/output";
const OUT_FILE: string = join(OUT_DIR, "entry.txt");

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

// Validate the line before writing anything. The gate counts every
// character, so stray whitespace at either end would waste the budget and
// look sloppy beside the other entries; reject it here, not at the judge.
if (REVIEW.trim().length === 0) fail("review line is blank");
if (REVIEW !== REVIEW.trim()) {
  fail("review line has leading or trailing whitespace");
}
if (REVIEW.length < 1 || REVIEW.length > 200) {
  fail(`review line is ${REVIEW.length} characters, must be 1-200`);
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  fail("review line must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, REVIEW, "utf8");

// Read it back and fail loudly on any mismatch, so a bad write never
// reaches the judge silently.
const written: string = readFileSync(OUT_FILE, "utf8");
if (written !== REVIEW) {
  fail("read-back mismatch: /output/entry.txt does not match the review line");
}
if (written.trim().length === 0 || written.length > 200) {
  fail("written entry failed the 1-200 character gate");
}

console.log(`Wrote ${written.length} characters to ${OUT_FILE}`);
console.log(written);
