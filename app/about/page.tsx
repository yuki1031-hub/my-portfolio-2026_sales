import BackButton from '../../components/BackButton';
import styles from './page.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// ABOUT</h2>
      </div>
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>WHO AM I</h3>
          <p className={styles.text}>
            LINE構築・Lステップ実装・LP制作を中心に活動しています。
            クライアントのビジネスゴールを技術で実現することを得意としています。
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>CAREER</h3>
          <div className={styles.timeline}>
            <div className={styles.item}>
              <div className={styles.date}>〜2024</div>
              <div className={styles.detail}>
                <div className={styles.itemTitle}>チャットコマース系ITベンチャー</div>
                <div className={styles.itemDesc}>LINEチャットボット実装・シナリオ設計・クライアント対応</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.date}>2026〜</div>
              <div className={styles.detail}>
                <div className={styles.itemTitle}>フリーランス独立</div>
                <div className={styles.itemDesc}>LINE構築・LP制作・Webサイト開発をフリーランスとして提供中</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>PHILOSOPHY</h3>
          <p className={styles.text}>
            技術は手段。クライアントのビジネス課題を理解し、
            最適なソリューションを一緒に考え、実装します。
          </p>
        </section>
      </div>
    </div>
  );
}
