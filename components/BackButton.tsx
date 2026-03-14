'use client';
import { useRouter } from 'next/navigation';
import { runPageTransition } from './pageTransition';
import styles from './BackButton.module.css';

export default function BackButton() {
  const router = useRouter();

  const handleBack = async () => {
    await runPageTransition();
    router.push('/');
  };

  return (
    <button className={styles.btn} onClick={handleBack} aria-label="Back to home">
      ← BACK
    </button>
  );
}
