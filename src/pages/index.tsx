import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="kmworks"
      description="kmworks is an open-source comic and manga reading ecosystem: server and native clients, drop-in compatible with Komga.">
      <header className={styles.hero}>
        <img className={styles.glyph} src="img/logo.svg" alt="kmworks logo" />
        <p className={styles.eyebrow}>Komga-compatible, end to end</p>
        <h1 className={styles.title}>kmworks</h1>
        <p className={styles.sub}>
          An open-source comic and manga reading ecosystem: server and native
          clients.
        </p>
      </header>

      <main className={styles.projects}>
        <Link className={styles.card} to="/server/">
          <h2 className={styles.cardTitle}>server</h2>
          <p className={styles.desc}>
            Your comics, one static binary, web UI included. Drop-in
            compatible with Komga: same API, same database.
          </p>
          <span className={styles.link}>Docs &amp; downloads <i>→</i></span>
        </Link>
        <Link className={styles.card} to="/reader/">
          <h2 className={styles.cardTitle}>reader</h2>
          <p className={styles.desc}>
            Native reading on iPhone, iPad, Mac, and Apple TV, online or
            offline.
          </p>
          <span className={styles.link}>Docs &amp; App Store <i>→</i></span>
        </Link>
      </main>
    </Layout>
  );
}
