import BackButton from '../../components/BackButton';
import styles from './page.module.css';

const LP_PROJECTS = [
  {
    id: 'gym-lp1',
    name: 'ジムLP①',
    theme: 'ダーク × オレンジ',
    desc: 'ジムの入会促進LP。ダークトーンとオレンジのコントラストで力強い印象を演出。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://gym-lp-gules.vercel.app/',
    image: '/images/gym-lp.png',
  },
  {
    id: 'gym-lp2',
    name: 'ジムLP②',
    theme: 'ピンク紫グラデ × 蛍光イエロー',
    desc: 'タブ切り替え・スライダー・ビフォーアフター機能付きのリッチなジムLP。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://gym-lp2.vercel.app/',
    image: '/images/gym2.jpg',
  },
  {
    id: 'mens-depilation',
    name: 'メンズ脱毛LP',
    theme: 'ダークネイビー × オレンジ',
    desc: '男性向け脱毛サロンのLP。落ち着いたネイビーとオレンジで信頼感と活力を表現。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://mens-depilation-lp2.vercel.app/',
    image: '/images/men.jpg',
  },
  {
    id: 'womens-depilation',
    name: 'ウィメンズ脱毛LP',
    theme: 'ピンク〜ベージュ × 水色',
    desc: '女性向け脱毛サロンのLP。優しいグラデーションで清潔感と上品さを演出。',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://womens-depilation-lp.vercel.app/',
    image: '/images/women.jpg',
  },
  {
    id: 'kodomoshokudo',
    name: '子ども食堂LP',
    theme: 'オレンジ × イエロー',
    desc: '地域の子ども食堂のLP。温かみのある色合いとNext.jsで高速表示を実現。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    url: 'https://kodomoshokudo-lp.vercel.app/',
    image: '/images/kodomo.jpg',
  },
];

export default function LpWorks() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// LP WORKS</h2>
      </div>
      <div className={styles.grid}>
        {LP_PROJECTS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label={`Open ${p.name}`}
          >
            <div className={styles.thumb}>
              <img src={p.image} alt={p.name} className={styles.thumbImg} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardName}>{p.name}</div>
              <div className={styles.cardTheme}>{p.theme}</div>
              <div className={styles.cardDesc}>{p.desc}</div>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <div className={styles.viewLink}>↗ VIEW</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
