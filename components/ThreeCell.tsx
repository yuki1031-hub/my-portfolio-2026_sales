'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from './ThreeCell.module.css';

const ThreeCellInner = dynamic(() => import('./ThreeCellInner'), { ssr: false });

type CellType = 'LP_WORKS' | 'PROFILE' | 'CHATBOT' | 'CONTACT' | 'YOUTUBE' | 'ABOUT';

interface Props {
  type: CellType;
  label: string;
  labelColor: string;
  href: string;
  onNavigate: (href: string) => void;
}

export default function ThreeCell({ type, label, labelColor, href, onNavigate }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.cell}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(href)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(href)}
      aria-label={`Navigate to ${label}`}
    >
      <div className={styles.canvasWrap}>
        <ThreeCellInner type={type} isHovered={hovered} />
      </div>
      <div className={styles.label} style={{ color: labelColor }}>
        {label}
      </div>
    </div>
  );
}
