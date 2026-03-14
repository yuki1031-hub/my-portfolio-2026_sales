'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ThreeCell.module.css';

type CellType = 'LP_WORKS' | 'PROFILE' | 'CHATBOT' | 'CONTACT' | 'YOUTUBE' | 'ABOUT';

interface Props {
  type: CellType;
  isHovered: boolean;
}

const CELL_CONFIGS: Record<CellType, {
  color: number;
  emissive?: number;
  metalness?: number;
  roughness?: number;
  label?: string;
  labelColor?: string;
  geometry?: [number, number, number];
}> = {
  LP_WORKS:  { color: 0x0d1f0d, emissive: 0x002800 },
  PROFILE:   { color: 0xcccccc, metalness: 0.95, roughness: 0.05 },
  CHATBOT:   { color: 0x05a845, emissive: 0x003322 },
  CONTACT:   { color: 0x0f0f0f, emissive: 0x1a0a00, geometry: [1.4, 1, 0.1] },
  YOUTUBE:   { color: 0xcc0000, emissive: 0x330000, label: '▶', labelColor: '#ffffff' },
  ABOUT:     { color: 0xcc4400, emissive: 0x221100 },
};

function makeTextTexture(text: string, color: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = color;
  const fontSize = text.length <= 2 ? 110 : text.length <= 3 ? 80 : 60;
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2);
  return new THREE.CanvasTexture(canvas);
}

export default function ThreeCellInner({ type, isHovered }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(0.008);

  useEffect(() => {
    speedRef.current = isHovered ? 0.028 : 0.008;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let animId: number;
    let renderer: THREE.WebGLRenderer;
    let ro: ResizeObserver;

    const run = async () => {
      const loader = new THREE.TextureLoader();

      let frontTex: THREE.Texture | null = null;
      let bgTex: THREE.Texture | null = null;
      let sphereTex: THREE.Texture | null = null;

      if (type === 'CHATBOT') {
        [frontTex, bgTex] = await Promise.all([
          loader.loadAsync('/images/ch-front.png'),
          loader.loadAsync('/images/ch-bg.png'),
        ]);
      } else if (type === 'CONTACT') {
        [frontTex, bgTex] = await Promise.all([
          loader.loadAsync('/images/mail.png'),
          loader.loadAsync('/images/mailbg.png'),
        ]);
      } else if (type === 'PROFILE') {
        sphereTex = await loader.loadAsync('/images/earth.png');
      } else if (type === 'LP_WORKS') {
        [frontTex, bgTex] = await Promise.all([
          loader.loadAsync('/images/LPicon.png'),
          loader.loadAsync('/images/LPiconbg.png'),
        ]);
      } else if (type === 'ABOUT') {
        bgTex = await loader.loadAsync('/images/about.png');
      }

      if (cancelled) return;

      const w = canvas.clientWidth || 110;
      const h = canvas.clientHeight || 110;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 3.6;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.3);
      dir.position.set(4, 5, 5);
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x4466ff, 0.35);
      fill.position.set(-4, -3, -5);
      scene.add(fill);

      const cfg = CELL_CONFIGS[type];
      let mesh: THREE.Mesh;

      if (type === 'PROFILE') {
        const geo = new THREE.SphereGeometry(1, 32, 32);
        const mat = new THREE.MeshStandardMaterial({
          map: sphereTex,
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.7,
        });
        mesh = new THREE.Mesh(geo, mat);
      } else if ((type === 'CHATBOT' || type === 'CONTACT' || type === 'LP_WORKS') && frontTex && bgTex) {
        const [gw, gh, gd] = cfg.geometry ?? [1.45, 1.45, 1.45];
        const geo = new THREE.BoxGeometry(gw, gh, gd);
        const bgMat = new THREE.MeshStandardMaterial({ map: bgTex });
        const frontMat = new THREE.MeshStandardMaterial({ map: frontTex });
        // BoxGeometry face order: right, left, top, bottom, front(+z), back(-z)
        mesh = new THREE.Mesh(geo, [bgMat, bgMat, bgMat, bgMat, frontMat, bgMat]);
      } else if (type === 'ABOUT' && bgTex) {
        const [gw, gh, gd] = cfg.geometry ?? [1.45, 1.45, 1.45];
        const geo = new THREE.BoxGeometry(gw, gh, gd);
        const mat = new THREE.MeshStandardMaterial({ map: bgTex });
        mesh = new THREE.Mesh(geo, mat);
      } else {
        const [gw, gh, gd] = cfg.geometry ?? [1.45, 1.45, 1.45];
        const geo = new THREE.BoxGeometry(gw, gh, gd);
        const baseMat = new THREE.MeshPhongMaterial({
          color: cfg.color,
          emissive: cfg.emissive ?? 0x000000,
          shininess: 90,
        });

        if (cfg.label) {
          const tex = makeTextTexture(cfg.label, cfg.labelColor ?? '#ffffff');
          const frontMat = new THREE.MeshPhongMaterial({
            color: cfg.color,
            emissive: cfg.emissive ?? 0x000000,
            shininess: 90,
            map: tex,
          });
          // BoxGeometry: right, left, top, bottom, front(+z), back(-z)
          mesh = new THREE.Mesh(geo, [baseMat, baseMat, baseMat, baseMat, frontMat, baseMat]);
        } else {
          mesh = new THREE.Mesh(geo, baseMat);
        }
      }

      scene.add(mesh);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        mesh.rotation.y += speedRef.current;
        mesh.rotation.x = Math.sin(Date.now() * 0.0008) * 0.08;
        renderer.render(scene, camera);
      };
      animate();

      ro = new ResizeObserver(() => {
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (cw > 0 && ch > 0) {
          camera.aspect = cw / ch;
          camera.updateProjectionMatrix();
          renderer.setSize(cw, ch);
        }
      });
      ro.observe(canvas);
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      ro?.disconnect();
      renderer?.dispose();
    };
  }, [type]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
