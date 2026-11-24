import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Round 2 entry selected via 8-candidate Swiss tournament and dual-panel 5-way shootout vs Round 1 (#14/2632).
const ENTRY_LINE =
  'At noon today, our waitress Brenda heard my dad\'s spoon rattling against his bowl, took his soup back, and returned it in a heavy mug: "Saw a crack in the rim. Mug stays hotter anyway."';

function validateEntry(line: string): string {
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Entry must be a single line with no newline characters.');
  }
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error('Entry must not be empty or whitespace only.');
  }
  const codePointCount = [...line].length;
  if (codePointCount < 1 || codePointCount > 200) {
    throw new Error(`Entry length ${codePointCount} is outside the 1..200 character cap.`);
  }
  return line;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const verified = validateEntry(ENTRY_LINE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), verified, 'utf8');
}

main();
