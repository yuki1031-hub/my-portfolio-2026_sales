'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { runPageTransition } from '../../components/pageTransition';
import SiteHeader from '../../components/SiteHeader';
import styles from './page.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);

  const form = e.currentTarget;
  const email   = (form.elements.namedItem('email')   as HTMLInputElement).value;
  const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
  const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, subject, message }),
  });

  if (res.ok) {
    setSent(true);
  } else {
    alert('送信に失敗しました。時間をおいて再試行してください。');
  }

  setSending(false);
};

  const handleBack = async () => {
    await runPageTransition();
    router.push('/');
  };

  return (
    <div className={`${styles.page} pageEnter`}>
      <SiteHeader />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>CONTACT</h1>

        {sent ? (
          <div className={styles.sentMsg}>
            <p>MESSAGE SENT.</p>
            <p className={styles.sentSub}>Thank you. I will reply soon.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Subject</label>
              <input
                type="text"
                name="subject"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                className={`${styles.input} ${styles.textarea}`}
                rows={6}
                required
              />
            </div>
            <div className={styles.btnRow}>
              <button type="submit" className={styles.sendBtn} disabled={sending}>
                {sending ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </div>
          </form>
        )}
      </main>

      <footer className={styles.foot}>
        <button className={styles.backBtn} onClick={handleBack}>
          ← BACK
        </button>
      </footer>
    </div>
  );
}
