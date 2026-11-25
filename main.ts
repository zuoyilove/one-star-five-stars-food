// One Star, Five Stars for the Food — make.fun entry (program/v1).
// Writes a single alien-tourist one-star review of Earth that still
// compliments the food, to /output/entry.txt (or $ENTRY_OUTPUT locally).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const REVIEW =
  "One star: Earth's gravity squashed my spare tentacle, the locals gawked at my third eye, but the dumplings were so good I stayed an extra orbit just for seconds.";

// Gate the text the way the sealed scorer does: UTF-8, 1-200 chars,
// not only whitespace, exactly one sentence (one terminal mark, at the end).
const text = REVIEW.trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`review must be 1-200 characters, got ${text.length}`);
}
const terminators = text.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !/[.!?]$/.test(text)) {
  throw new Error("review must be exactly one sentence");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, text, "utf8");
console.log(`wrote ${text.length} characters to ${out}`);
