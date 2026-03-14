'use client';
import { useState } from 'react';
import BackButton from '../../components/BackButton';
import styles from './page.module.css';

const PROJECTS = [
  {
    id: 'ijin',
    name: '性格診断（点数制ロジック）',
    tool: 'Lステップ',
    desc: '9問のスコア加算方式で、合計点数に応じて8パターンの偉人キャラクターを診断。シナリオ分岐とリッチメニュー連動で没入感のある体験を設計。',
    features: [
      '9問スコア加算ロジック実装',
      '8パターン診断結果シナリオ',
      '合計スコア判定ロジック',
      'リッチメニュー連動',
      'シナリオ分岐設計',
    ],
    image: '/images/ijindemo.gif',
  },
  {
    id: 'color',
    name: '回答フォーム',
    tool: 'Lステップ',
    desc: '回答フォーム×タグ付け方式。希望カラー・肌トーン・ダメージ具合を回答してもらい、タグ付けで顧客データを自動管理。リマインダー配信にも連動。',
    features: [
      '回答フォーム設計',
      'タグ付け自動化',
      '顧客セグメント管理',
      'リマインダー配信連動',
      'パーソナライズ返信',
    ],
    image: '/images/カラー１.gif',
  },
];

export default function Chatbot() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>// CHATBOT</h2>
      </div>

      <div className={styles.projects}>
        {PROJECTS.map((p) => (
          <div key={p.id} className={styles.project}>
            <div className={styles.projectHeader}>
              <span className={styles.projectName}>{p.name}</span>
              <span className={styles.tool}>{p.tool}</span>
            </div>
            <div className={styles.projectBody}>
              <button
                className={styles.imgBtn}
                onClick={() => setExpanded(p.id)}
                aria-label={`Expand screenshot of ${p.name}`}
              >
                <img src={p.image} alt={p.name} className={styles.imgThumb} />
              </button>
              <div className={styles.info}>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.features}>
                  {p.features.map((f) => (
                    <li key={f}>▸ {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className={styles.modal}
          onClick={() => setExpanded(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot expanded view"
        >
          <div className={styles.modalInner} onClick={(e) => e.stopPropagation()}>
            <img
              src={PROJECTS.find((p) => p.id === expanded)?.image}
              alt="screenshot"
              className={styles.modalImgEl}
            />
            <button
              className={styles.modalClose}
              onClick={() => setExpanded(null)}
              aria-label="Close"
            >
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
