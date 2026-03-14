import BackButton from '../../components/BackButton';
import styles from './page.module.css';

const SKILLS = [
  { cat: 'LINE / Chatbot', items: ['Lステップ', 'LINE Messaging API', 'チャットボット設計', 'シナリオ設計', '診断コンテンツ'] },
  { cat: 'Frontend', items: ['HTML / CSS / JS', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { cat: 'Tools & Infra', items: ['Git / GitHub', 'Vercel', 'Figma', 'WordPress'] },
];

export default function Profile() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// PROFILE</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.avatar}>H</div>
          <div className={styles.heroText}>
            <div className={styles.nameEn}>Hishikawa.Y</div>
            <div className={styles.role}>Freelance Engineer</div>
          </div>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>ABOUT</h3>
          <p className={styles.text}>
            チャットコマース系ITベンチャーにてLINEチャットボット実装を経験後、フリーランスとして独立。
            LINE構築・Lステップ実装とLP制作を専門とし、クライアントのビジネス成長をサポートしています。
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>SPECIALTY</h3>
          <ul className={styles.list}>
            <li>LINE構築 / Lステップ実装</li>
            <li>LP制作（HTML / CSS / JavaScript）</li>
            <li>チャットボット設計・診断コンテンツ制作</li>
            <li>Next.js / Reactを使ったWebサイト制作</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>SKILLS</h3>
          <div className={styles.skillGrid}>
            {SKILLS.map((s) => (
              <div key={s.cat} className={styles.skillGroup}>
                <div className={styles.skillCat}>{s.cat}</div>
                <div className={styles.skillTags}>
                  {s.items.map((item) => (
                    <span key={item} className={styles.skillTag}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
