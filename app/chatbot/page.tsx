import BackButton from '../../components/BackButton';
import styles from './page.module.css';

const PROJECTS = [
  {
    id: 'ijin',
    name: '性格診断（点数制ロジック）',
    tool: 'Lステップ',
    badges: ['Lステップ', '9問スコア加算', '8パターン分岐', 'シナリオ設計'],
    desc: '9問のスコア加算方式で、合計点数に応じて8パターンの偉人キャラクターを診断。シナリオ分岐とリッチメニュー連動で没入感のある体験を設計。',
    image: '/images/ijin.png',
    notionUrl: 'https://flying-glazer-dfd.notion.site/32591932982b80bcaab8e0c287fbab7c?source=copy_link',
  },
  {
    id: 'color',
    name: '予約×自動化シナリオ',
    tool: 'Lステップ',
    badges: ['Lステップ', '回答フォーム', 'タグ出し分け', 'LINE内CV', 'CV後シナリオ', '例外応答', 'リマインダー'],
    desc: 'LINE追加からユーザーの出し分け、予約完了・リピート促進まで全自動で動くエステサロン向けシナリオ',
    image: '/images/dainamik.png',
    notionUrl: 'https://flying-glazer-dfd.notion.site/LINE-32591932982b80d6959cc418402ce460?source=copy_link', 
  },
  {
    id: 'richmenu',
    name: 'リッチメニュー構築',
    tool: 'Lステップ',
    badges: ['Lステップ', 'Canva', '3分割レイアウト'],
    desc: '転職相談サービス向けのリッチメニュー。3分割レイアウトで各ボタンに外部URLを設定。Canvaでクリエイティブを制作しLステップに実装。',
    image: '/images/rm-thumbnail.png',
    notionUrl: 'https://flying-glazer-dfd.notion.site/32591932982b8084b5fcdbcd5bb49b00?source=copy_link', 
  },
];

export default function Chatbot() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// CHATBOT</h2>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.thumb}>
              <img src={p.image} alt={p.name} className={styles.thumbImg} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardName}>{p.name}</div>
              <div className={styles.badges}>
                {p.badges.map((b) => (
                  <span
                    key={b}
                    className={b === 'Lステップ' ? styles.badgeLstep : styles.badgeGray}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className={styles.cardDesc}>{p.desc}</div>
              <a
                href={p.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailBtn}
              >
                詳細を見る
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
