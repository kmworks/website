import {execFileSync} from 'node:child_process';
import {cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

// Docs are authored as plain markdown in each project repo (single source of
// truth); this mirrors them into synced/<section>/ for the Docusaurus build.
// Edit them there, never in synced/.
const SOURCES = [
  {repo: 'kmrs', branch: 'master', section: 'server'},
  {repo: 'kmreader', branch: 'main', section: 'reader'},
];

// Legacy per-project sites fold into this one; rewrite their absolute URLs
// to in-site paths.
const LINK_REWRITES = [
  [/\(https:\/\/kmworks\.github\.io\/kmrs\//g, '(/server/'],
  [/\(https:\/\/kmworks\.github\.io\/kmreader\//g, '(/reader/'],
];

// Product landing pages own the section root; intro docs move to
// /<section>/intro.
const FRONTMATTER_REWRITES = [[/^slug: \/\n/m, '']];

const OUT = new URL('../synced/', import.meta.url).pathname;

for (const {repo, branch, section} of SOURCES) {
  const tmp = join(tmpdir(), `kmworks-sync-${repo}`);
  rmSync(tmp, {recursive: true, force: true});
  execFileSync(
    'git',
    ['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', branch, `https://github.com/kmworks/${repo}.git`, tmp],
    {stdio: 'inherit'},
  );
  execFileSync('git', ['sparse-checkout', 'set', 'docs'], {cwd: tmp, stdio: 'inherit'});

  mkdirSync(OUT, {recursive: true});
  const dest = join(OUT, section);
  rmSync(dest, {recursive: true, force: true});
  mkdirSync(dest, {recursive: true});

  for (const file of readdirSync(join(tmp, 'docs'))) {
    if (!file.endsWith('.md')) continue;
    let text = readFileSync(join(tmp, 'docs', file), 'utf8');
    for (const [from, to] of LINK_REWRITES) text = text.replace(from, to);
    for (const [from, to] of FRONTMATTER_REWRITES) text = text.replace(from, to);
    writeFileSync(join(dest, file), text);
  }
  rmSync(tmp, {recursive: true, force: true});
  console.log(`synced ${repo} -> ${section}`);
}
