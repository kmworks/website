import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
  ArrowRight,
  BookOpen,
  Database,
  DeviceMobile,
  Feather,
  GithubLogo,
  GitDiff,
  Pulse,
  Translate,
} from '@phosphor-icons/react';

import styles from '../landing.module.css';

const dockerRun = `docker run -d \\
  --name=komga \\
  --user 1000:1000 \\
  -p 25600:25600 \\
  --mount type=bind,source=/path/to/config,target=/config \\
  --mount type=bind,source=/path/to/data,target=/data \\
  --restart unless-stopped \\
  ghcr.io/kmworks/kmrs`;

const binaryRun = `# grab the archive for your platform from the releases page:
#   https://github.com/kmworks/kmrs/releases/latest
./kmrs   # serves on http://localhost:25600`;

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroBg} />
      <div className="container">
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>Komga-compatible, drop-in</p>
            <h1 className={styles.heroTitle}>
              Your comics,
              <br />
              <em>one</em> static binary.
            </h1>
            <p className={styles.heroSub}>
              Serve your comic and manga library to the web, your e-reader,
              and every app in between.
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.btnPrimary} to="/server/installation">
                Get started <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                className={styles.btnGhost}
                href="https://github.com/kmworks/kmrs">
                <GithubLogo size={17} /> GitHub
              </Link>
            </div>
          </div>
          <div className={styles.heroCode}>
            <div className={styles.codeCaption}>
              <span>terminal</span>
              <span>one command</span>
            </div>
            <CodeBlock language="bash">{dockerRun}</CodeBlock>
          </div>
        </div>
      </div>
    </header>
  );
}

function Bento(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Same server, smaller footprint</h2>
          <p className={styles.sectionSub}>
            Same port, same mounts, same env vars, same database. What leaves
            is the runtime weight.
          </p>
        </div>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.cardWide}`}>
            <div className={styles.cardIcon}>
              <GitDiff size={26} weight="duotone" />
            </div>
            <h3 className={styles.cardTitle}>API parity, verified</h3>
            <p className={styles.cardBody}>
              REST, OPDS v1.2/v2, SSE, Kobo and KOReader sync. A differential
              harness compares ~105 endpoints against a live Java instance of
              komga 1.27.1.
            </p>
            <CodeBlock language="bash">
              {`python3 tests/diff/diff.py \\
  --java-jar komga.jar \\
  --rust-bin ./kmrs`}
            </CodeBlock>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Database size={26} weight="duotone" />
            </div>
            <h3 className={styles.cardTitle}>Your data, as-is</h3>
            <p className={styles.cardBody}>
              Point kmrs at an existing komga data directory and it upgrades
              <code>database.sqlite</code> in place with byte-for-byte Flyway
              migrations. The Java version can still open libraries written by
              kmrs.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Feather size={26} weight="duotone" />
            </div>
            <h3 className={styles.cardTitle}>Runs anywhere</h3>
            <p className={styles.cardBody}>
              One static binary for Linux, macOS, and Windows, x86_64 and
              aarch64.
            </p>
          </div>
          <div className={`${styles.card} ${styles.cardCjk}`}>
            <div className={styles.cardIcon}>
              <Translate size={26} weight="duotone" />
            </div>
            <h3 className={styles.cardTitle}>CJK cross-search</h3>
            <p className={styles.cardBody}>
              Simplified and traditional Chinese match each other, and CJK
              unigrams find titles mid-run.
            </p>
            <span className={styles.cjkGlyphs}>简繁</span>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Pulse size={26} weight="duotone" />
            </div>
            <h3 className={styles.cardTitle}>Heap profiling built in</h3>
            <p className={styles.cardBody}>
              jemalloc sampling with a pprof endpoint, always on in release
              builds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quickstart(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.split}>
          <div>
            <h2 className={styles.sectionTitle}>Up and reading in one command</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepName}>Install</span>
                <p className={styles.stepDesc}>
                  One <code>docker run</code>, or a single static binary from
                  the releases page.
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepName}>Keep your library</span>
                <p className={styles.stepDesc}>
                  Point <code>/config</code> at your existing komga data. kmrs
                  upgrades it in place.
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepName}>Pick a reader</span>
                <p className={styles.stepDesc}>
                  The bundled kmweb UI, KMReader, KOReader, Kobo, or any
                  OPDS client.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.codePanel}>
            <Tabs>
              <TabItem value="docker" label="Docker" default>
                <CodeBlock language="bash">{dockerRun}</CodeBlock>
              </TabItem>
              <TabItem value="binary" label="Binary">
                <CodeBlock language="bash">{binaryRun}</CodeBlock>
              </TabItem>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

type Client = {
  label: string;
  icon: ReactNode;
  to?: string;
  href?: string;
};

const clients: Client[] = [
  {
    label: 'KMReader',
    to: '/reader/',
    icon: <DeviceMobile size={18} />,
  },
  {
    label: 'KOReader',
    href: 'https://koreader.rocks',
    icon: <BookOpen size={18} />,
  },
  {
    label: 'Kobo',
    href: 'https://komga.org/docs/guides/kobo',
    icon: <BookOpen size={18} />,
  },
  {
    label: 'Any Komga client',
    href: 'https://komga.org/docs/category/readers',
    icon: <ArrowRight size={18} weight="bold" />,
  },
];

function Clients(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.clients}`}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Bring your own reader</h2>
        <p className={styles.sectionSub}>
          Compatible with the Komga API and its reader ecosystem.
        </p>
        <div className={styles.chipRow}>
          {clients.map((c) => (
            <Link
              className={styles.chip}
              to={c.to}
              href={c.href}
              key={c.label}>
              {c.icon}
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta(): ReactNode {
  return (
    <section className={styles.final}>
      <div className={styles.finalBg} />
      <div className="container">
        <h2 className={styles.finalTitle}>Start serving your comics.</h2>
        <div className={styles.ctaRow}>
          <Link className={styles.btnPrimary} to="/server/installation">
            Get started <ArrowRight size={16} weight="bold" />
          </Link>
          <Link className={styles.btnGhost} to="/server/intro">
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServerHome(): ReactNode {
  return (
    <Layout
      title="Comic & manga server in a single binary"
      description="kmrs is a comic and manga server in a single static Rust binary, drop-in compatible with Komga: same API, same database.">
      <div className={styles.page}>
        <Hero />
        <Bento />
        <Quickstart />
        <Clients />
        <FinalCta />
      </div>
    </Layout>
  );
}
