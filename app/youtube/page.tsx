import BackButton from '../../components/BackButton';
import styles from './page.module.css';

export default function Youtube() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// YOUTUBE</h2>
      </div>
      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.ytIcon}>▶</div>
          <div className={styles.info}>
            <div className={styles.channelName}>@cabby_</div>
            <p className={styles.desc}>
              プログラミング・フリーランス・テック系コンテンツを発信中。<br />
              Web制作やLINE構築の実践的な知識をシェアしています。
            </p>
            <a
              href="https://www.youtube.com/@cabby_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              ↗ チャンネルを見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
