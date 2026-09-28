import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="kmworks"
      description="kmworks is an open-source comic and manga reading ecosystem: the kmrs server, the kmweb UI, and KMReader for Apple platforms. Drop-in compatible with Komga.">
      <header className={styles.hero}>
        <img className={styles.glyph} src="img/logo.svg" alt="kmworks logo" />
        <p className={styles.eyebrow}>Komga-compatible, end to end</p>
        <h1 className={styles.title}>kmworks</h1>
        <p className={styles.sub}>
          An open-source comic and manga reading ecosystem: server, web UI, and
          native clients.
        </p>
      </header>

      <main className={styles.projects}>
        <Link className={styles.card} to="/kmrs/">
          <p className={styles.role}>The server</p>
          <h2 className={styles.cardTitle}>kmrs</h2>
          <p className={styles.desc}>
            Your comics, one static binary. Drop-in compatible with Komga: same
            API, same database.
          </p>
          <span className={styles.link}>Docs &amp; downloads <i>→</i></span>
        </Link>
        <Link className={styles.card} to="/kmreader/">
          <p className={styles.role}>The Apple client</p>
          <h2 className={styles.cardTitle}>KMReader</h2>
          <p className={styles.desc}>
            Native reading on iPhone, iPad, Mac, and Apple TV, online or
            offline.
          </p>
          <span className={styles.link}>Site &amp; App Store <i>→</i></span>
        </Link>
        <Link className={styles.card} to="/kmweb/">
          <p className={styles.role}>The web UI</p>
          <h2 className={styles.cardTitle}>kmweb</h2>
          <p className={styles.desc}>
            The React interface bundled with the kmrs Docker image, served at /
            out of the box.
          </p>
          <span className={styles.link}>Docs <i>→</i></span>
        </Link>
      </main>
    </Layout>
  );
}
