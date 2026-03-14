export async function runPageTransition(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '99999',
      background: '#fff',
      opacity: '0',
      pointerEvents: 'all',
      transformOrigin: 'center center',
    });
    document.body.appendChild(overlay);

    // Step 1: 白いオーバーレイが現れる (0.1s)
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.1s ease';
      overlay.style.opacity = '1';
    });

    setTimeout(() => {
      // Step 2: 上下から中心に収束して横線1本になる (0.15s)
      overlay.style.transition = 'transform 0.15s ease';
      overlay.style.transform = 'scaleY(0.018)';

      setTimeout(() => {
        // Step 3: 一瞬チラ見え (0.05s)
        // 白い横線が残っている状態を維持

        setTimeout(() => {
          // Step 4: 横線が消える (0.08s)
          overlay.style.transition = 'transform 0.08s ease, opacity 0.08s ease';
          overlay.style.transform = 'scaleY(0.018) scaleX(0)';
          overlay.style.opacity = '0';

          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
            resolve();
          }, 90);
        }, 55);
      }, 160);
    }, 110);
  });
}
