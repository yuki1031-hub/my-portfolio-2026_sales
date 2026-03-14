'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Bezel.module.css';

const FloatingDots = dynamic(() => import('./FloatingDots'), { ssr: false });

export default function Bezel({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (mounted && isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        {!isHome && <FloatingDots />}
        {children}
      </div>
    );
  }

  return (
    <div className={styles.bezel}>
      <div className={styles.screen}>
        {mounted && !isHome && <FloatingDots />}
        {children}
      </div>
      <div className={styles.bezelLogo}>HSKW</div>
    </div>
  );
}
