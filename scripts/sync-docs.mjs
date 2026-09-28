import {execFileSync} from 'node:child_process';
import {cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

// Docs are authored in each project repo (single source of truth); this
// mirrors them into synced/<project>/ for the Docusaurus build. Edit them
// there, never in synced/.
const SOURCES = [
  {repo: 'kmrs', branch: 'master'},
  {repo: 'kmreader', branch: 'main'},
];

// Legacy per-project sites fold into this one; rewrite their absolute URLs
// to in-site paths.
const LINK_REWRITES = [
  [/\(https:\/\/kmworks\.github\.io\/kmrs\//g, '(/kmrs/'],
  [/\(https:\/\/kmworks\.github\.io\/kmreader\//g, '(/kmreader/'],
];

const OUT = new URL('../synced/', import.meta.url).pathname;

for (const {repo, branch} of SOURCES) {
  const tmp = join(tmpdir(), `kmworks-sync-${repo}`);
  rmSync(tmp, {recursive: true, force: true});
  execFileSync(
    'git',
    ['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', branch, `https://github.com/kmworks/${repo}.git`, tmp],
    {stdio: 'inherit'},
  );
  execFileSync('git', ['sparse-checkout', 'set', 'website/docs'], {cwd: tmp, stdio: 'inherit'});

  mkdirSync(OUT, {recursive: true});
  const dest = join(OUT, repo);
  rmSync(dest, {recursive: true, force: true});
  cpSync(join(tmp, 'website/docs'), dest, {recursive: true});
  rmSync(tmp, {recursive: true, force: true});

  for (const file of readdirSync(dest)) {
    if (!file.endsWith('.md')) continue;
    const p = join(dest, file);
    let text = readFileSync(p, 'utf8');
    for (const [from, to] of LINK_REWRITES) text = text.replace(from, to);
    writeFileSync(p, text);
  }
  console.log(`synced ${repo}`);
}
