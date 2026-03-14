import TVScreen from '../components/TVScreen';
import NavGrid from '../components/NavGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.siteTitle}>HISHIKAWA.Y</h1>
        <div className={styles.divider} />
      </header>

      <main className={styles.main}>
        <div className={styles.tvWrap}>
          <TVScreen />
        </div>
        <NavGrid />
      </main>

      <footer className={styles.footer}>
        <span>© 2026 HISHIKAWA.Y</span>
      </footer>
    </div>
  );
}
