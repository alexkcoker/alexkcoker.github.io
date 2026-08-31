// Writes .env.local with NEXT_PUBLIC_LAST_UPDATED, derived from the last git
// commit, so the footer's "Last updated" line can't go stale by accident.
// Run automatically before `next build` via the npm `prebuild` script.
//
// Uses execFileSync (an args array, no shell) rather than execSync (a shell
// command string) — on Windows execSync runs the command through cmd.exe,
// whose own %-based variable expansion mangles git's
// --date=format:%Y-%m-%d tokens.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

let lastUpdated = '';
try {
  lastUpdated = execFileSync('git', [
    'log',
    '-1',
    '--format=%cd',
    '--date=format:%Y-%m-%d',
  ])
    .toString()
    .trim();
} catch {
  lastUpdated = '';
}

writeFileSync(
  path.join(repoRoot, '.env.local'),
  `NEXT_PUBLIC_LAST_UPDATED=${lastUpdated}\n`,
);
