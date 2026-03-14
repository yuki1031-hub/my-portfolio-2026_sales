'use client';
import { useEffect, useRef } from 'react';
import styles from './TVScreen.module.css';

export default function TVScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 低解像度でピクセルノイズ感を出す
    const W = 120;
    const H = 90;
    canvas.width = W;
    canvas.height = H;

    let animId: number;
    const draw = () => {
      const imageData = ctx.createImageData(W, H);
      const buf = imageData.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i]     = v; // R
        buf[i + 1] = v; // G
        buf[i + 2] = v; // B
        buf[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={styles.miniBezel}>
      <div className={styles.tvScreen}>
        <canvas ref={canvasRef} className={styles.staticCanvas} />
        <div className={styles.scanlines} />
        <span className={styles.worksText}>WORKS</span>
      </div>
    </div>
  );
}
