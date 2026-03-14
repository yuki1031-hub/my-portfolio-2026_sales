'use client';
import { useState } from 'react';
import BackButton from '../../components/BackButton';
import styles from './page.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // 実際の送信処理に差し替え可能（Formspree等）
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton />
        <h2 className={styles.pageTitle}>CONTACT</h2>
      </div>

      {sent ? (
        <div className={styles.sentMsg}>
          <p>MESSAGE SENT.</p>
          <p className={styles.sentSub}>Thank you. I will reply soon.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Email"
              required
              autoComplete="email"
              data-placeholder-color="red"
            />
          </div>
          <div className={styles.field}>
            <input
              type="text"
              name="subject"
              className={`${styles.input} ${styles.inputOrange}`}
              placeholder="Subject"
              required
            />
          </div>
          <div className={styles.field}>
            <textarea
              name="message"
              className={`${styles.input} ${styles.textarea} ${styles.inputYellow}`}
              placeholder="Message"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={sending}
          >
            {sending ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      )}
    </div>
  );
}
