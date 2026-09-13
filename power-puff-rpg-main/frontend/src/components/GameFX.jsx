import React, { useEffect, useRef } from 'react';

/**
 * Tactical GameFX Dispatcher
 * Dispatches a custom window event to trigger contextual particle FX anywhere.
 * 
 * @param {string} type - 'dark-dungeon' | 'cyberpunk' | 'cozy-pink' | 'gold' | 'intellect' | 'strength' | 'vitality' | 'mind' | 'celebrate'
 * @param {number} clientX - screen X coordinate (or normalized 0-1)
 * @param {number} clientY - screen Y coordinate (or normalized 0-1)
 */
export function triggerGameFX(type = 'celebrate', clientX = null, clientY = null) {
  let x = clientX;
  let y = clientY;

  // If coordinates are normalized (0 to 1), map to window size
  if (typeof x === 'number' && x >= 0 && x <= 1 && typeof y === 'number' && y >= 0 && y <= 1) {
    x = x * window.innerWidth;
    y = y * window.innerHeight;
  } else if (x === null || y === null) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }

  // Trigger screen impact tremor for Strength
  if (type === 'strength') {
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('rpg-screen-tremor');
      setTimeout(() => root.classList.remove('rpg-screen-tremor'), 350);
    }
  }

  window.dispatchEvent(new CustomEvent('rpg-game-fx', {
    detail: { type, x, y }
  }));
}

/**
 * Contextual RPG GameFX Canvas Engine
 * Pure 100% inline HTML5 Canvas particle simulation with zero external dependencies.
 * Automatically sleeps when no particles are active to maintain 60FPS and 0% idle CPU.
 */
export default function GameFXCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Classes & Factory
    const spawnParticles = (type, originX, originY) => {
      const count = type === 'celebrate' ? 45 : 32;
      const newParticles = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;

        if (type === 'dark-dungeon') {
          // Arcane purple embers & shadow mist
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 0.8,
            vy: Math.sin(angle) * speed * 0.8 - 2, // Drift up
            size: Math.random() * 8 + 3,
            color: ['#a855f7', '#7c3aed', '#c084fc', '#4c1d95', '#f3e8ff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.012,
            type: Math.random() > 0.6 ? 'rune' : 'circle',
            rune: ['ᚱ', 'ᚦ', 'ᛟ', '✦', '★'][Math.floor(Math.random() * 5)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.06
          });
        } else if (type === 'cyberpunk' || type === 'cyberpunk-neon') {
          // High-voltage electric cyan & magenta sparks
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 1.4,
            vy: Math.sin(angle) * speed * 1.4,
            size: Math.random() * 7 + 2,
            color: ['#06b6d4', '#ec4899', '#facc15', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.028 + 0.02,
            type: Math.random() > 0.5 ? 'spark' : 'bit',
            bit: Math.random() > 0.5 ? '1' : '0',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15
          });
        } else if (type === 'cozy-pink' || type === 'cozy-pinkish' || type === 'bubbles') {
          // Sakura petals & floating hearts
          newParticles.push({
            x: originX + (Math.random() - 0.5) * 30,
            y: originY,
            vx: Math.cos(angle) * speed * 0.6,
            vy: Math.sin(angle) * speed * 0.6 + 1.2, // Drift down gently
            size: Math.random() * 9 + 4,
            color: ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.015 + 0.008,
            type: Math.random() > 0.5 ? 'heart' : 'petal',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04
          });
        } else if (type === 'gold' || type === 'billionaire-gold') {
          // Spinning 24k gold coins & diamond stars
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 1.1,
            vy: Math.sin(angle) * speed * 1.1 - 1.5,
            size: Math.random() * 9 + 5,
            color: ['#eab308', '#facc15', '#fef08a', '#ca8a04', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.018 + 0.012,
            type: Math.random() > 0.4 ? 'coin' : 'star',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.12
          });
        } else if (type === 'intellect') {
          // Mystic mind runes & neural sparks
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 0.9,
            vy: Math.sin(angle) * speed * 0.9 - 1.2,
            size: Math.random() * 9 + 4,
            color: ['#818cf8', '#6366f1', '#4f46e5', '#a5b4fc', '#facc15'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.012,
            type: Math.random() > 0.4 ? 'rune' : 'circle',
            rune: ['Ψ', 'Ω', '⚡', '🧠', '✦'][Math.floor(Math.random() * 5)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05
          });
        } else if (type === 'strength' || type === 'buttercup') {
          // Explosive fiery red/orange burst & tremors
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 1.6,
            vy: Math.sin(angle) * speed * 1.6,
            size: Math.random() * 8 + 3,
            color: ['#ef4444', '#f97316', '#e11d48', '#facc15', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.025 + 0.018,
            type: Math.random() > 0.5 ? 'flame' : 'spark',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2
          });
        } else if (type === 'vitality') {
          // Emerald leaves & healing motes
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 0.7,
            vy: Math.sin(angle) * speed * 0.7 - 1.5,
            size: Math.random() * 8 + 3,
            color: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.016 + 0.01,
            type: Math.random() > 0.5 ? 'cross' : 'circle',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04
          });
        } else if (type === 'mind') {
          // Celestial violet zen stars & ripples
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 0.8,
            vy: Math.sin(angle) * speed * 0.8,
            size: Math.random() * 7 + 3,
            color: ['#06b6d4', '#67e8f9', '#a855f7', '#c084fc', '#ffffff'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.018 + 0.01,
            type: 'star',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.08
          });
        } else {
          // Default Celebrate: Rainbow motes
          newParticles.push({
            x: originX,
            y: originY,
            vx: Math.cos(angle) * speed * 1.2,
            vy: Math.sin(angle) * speed * 1.2 - 2,
            size: Math.random() * 7 + 3,
            color: ['#a855f7', '#06b6d4', '#fb7185', '#facc15', '#34d399'][Math.floor(Math.random() * 5)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.012,
            type: 'spark',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.1
          });
        }
      }

      particlesRef.current.push(...newParticles);

      // Start animation loop if not already running
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      }
    };

    // Render loop
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'coin') {
          // Gilded Coin with G
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#78350f';
          ctx.font = `bold ${Math.round(p.size * 1.1)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('G', 0, 0);
        } else if (p.type === 'heart') {
          // Glowing Heart
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size * 0.6;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.3, s * 0.4, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.3, s * 0.4, s, -s * 0.6, 0, s * 0.3);
          ctx.fill();
        } else if (p.type === 'petal') {
          // Sakura Petal
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'rune' && p.rune) {
          // Ancient Rune
          ctx.fillStyle = p.color;
          ctx.font = `bold ${Math.round(p.size * 1.8)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.rune, 0, 0);
        } else if (p.type === 'bit' && p.bit) {
          // Binary bit
          ctx.fillStyle = p.color;
          ctx.font = `bold ${Math.round(p.size * 1.4)}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.bit, 0, 0);
        } else if (p.type === 'cross') {
          // Healing Cross
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size * 0.25, -p.size, p.size * 0.5, p.size * 2);
          ctx.fillRect(-p.size, -p.size * 0.25, p.size * 2, p.size * 0.5);
        } else if (p.type === 'star') {
          // Diamond 4-point star
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.3, -p.size * 0.3);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(p.size * 0.3, p.size * 0.3);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.3, p.size * 0.3);
          ctx.lineTo(-p.size, 0);
          ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'flame') {
          // Flame spark
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.quadraticCurveTo(p.size * 0.8, 0, 0, p.size * 0.8);
          ctx.quadraticCurveTo(-p.size * 0.8, 0, 0, -p.size * 1.4);
          ctx.fill();
        } else {
          // Circle/spark
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
      } else {
        animFrameRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleEvent = (e) => {
      if (e.detail) {
        spawnParticles(e.detail.type || 'celebrate', e.detail.x, e.detail.y);
      }
    };

    window.addEventListener('rpg-game-fx', handleEvent);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('rpg-game-fx', handleEvent);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden" 
    />
  );
}
