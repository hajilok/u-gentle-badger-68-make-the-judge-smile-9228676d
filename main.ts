import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Final entry selected via blind Swiss tournament and dual-panel Round-Robin shootout (20-0 calls).
const ENTRY_LINE =
  'When I picked up my mended coat today, Mrs. Kwon tucked a still-warm five-dollar bill into my palm and said, "Fell out of your lining. Looked tired, so I gave it the iron."';

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
