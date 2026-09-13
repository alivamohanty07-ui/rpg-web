import React from 'react';
import { motion } from 'framer-motion';

/**
 * High-fidelity Vector SVG Anime Chibi Sprite for "Pixel Buddy / Hero Scout"
 * Supports multiple pose animations and theme gear overlays
 */
export default function AnimeMascotSprite({ 
  pose = 'idle', // 'idle' | 'wave' | 'think' | 'point' | 'jump' | 'cyber'
  currentTheme = 'dark-dungeon',
  size = 110 
}) {
  // Wing flutter animation
  const wingVariants = {
    flutterLeft: {
      rotate: [-15, 25, -15],
      scaleX: [1, 0.85, 1],
      transition: { repeat: Infinity, duration: 0.35, ease: 'easeInOut' }
    },
    flutterRight: {
      rotate: [15, -25, 15],
      scaleX: [1, 0.85, 1],
      transition: { repeat: Infinity, duration: 0.35, ease: 'easeInOut' }
    }
  };

  // Body motion based on pose
  const getPoseAnimation = () => {
    switch (pose) {
      case 'jump':
        return {
          y: [0, -22, 0],
          rotate: [0, -8, 8, 0],
          scale: [1, 1.15, 0.95, 1],
          transition: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' }
        };
      case 'wave':
        return {
          rotate: [0, 10, -10, 8, 0],
          y: [0, -8, 0],
          transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
        };
      case 'think':
        return {
          rotate: [0, 8, 0],
          y: [0, -5, 0],
          transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
        };
      case 'point':
        return {
          x: [0, 6, 0],
          y: [0, -4, 0],
          transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
        };
      case 'cyber':
        return {
          x: [-2, 2, -1, 1, 0],
          y: [0, -6, 0],
          rotate: [-3, 3, -2, 2, 0],
          transition: { repeat: Infinity, duration: 0.4, ease: 'linear' }
        };
      case 'idle':
      default:
        return {
          y: [0, -9, 0],
          rotate: [0, 2, -2, 0],
          transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
        };
    }
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center select-none"
      animate={getPoseAnimation()}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 160 160" 
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] overflow-visible"
      >
        <defs>
          {/* Gradients for hair, skin, and magical wings */}
          <linearGradient id="chibiHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="chibiWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="60%" stopColor="rgba(192, 132, 252, 0.7)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" />
          </linearGradient>

          <linearGradient id="chibiRobeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <filter id="chibiGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= 1. FLUTTERING FAIRY WINGS ================= */}
        {/* Left Wing */}
        <motion.g
          style={{ originX: '70px', originY: '80px' }}
          variants={wingVariants}
          animate="flutterLeft"
        >
          <path
            d="M 68 75 C 30 40, 10 65, 30 95 C 45 110, 68 88, 68 75 Z"
            fill="url(#chibiWingGrad)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            filter="url(#chibiGlow)"
          />
          <path
            d="M 65 82 C 40 75, 25 95, 45 112 C 55 120, 66 95, 65 82 Z"
            fill="url(#chibiWingGrad)"
            opacity="0.8"
          />
        </motion.g>

        {/* Right Wing */}
        <motion.g
          style={{ originX: '92px', originY: '80px' }}
          variants={wingVariants}
          animate="flutterRight"
        >
          <path
            d="M 92 75 C 130 40, 150 65, 130 95 C 115 110, 92 88, 92 75 Z"
            fill="url(#chibiWingGrad)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            filter="url(#chibiGlow)"
          />
          <path
            d="M 95 82 C 120 75, 135 95, 115 112 C 105 120, 94 95, 95 82 Z"
            fill="url(#chibiWingGrad)"
            opacity="0.8"
          />
        </motion.g>

        {/* ================= 2. CHIBI BODY & ROBE ================= */}
        {/* Robe / Tunic */}
        <path
          d="M 62 92 C 58 118, 52 135, 80 138 C 108 135, 102 118, 98 92 Z"
          fill="url(#chibiRobeGrad)"
          stroke="#312e81"
          strokeWidth="2"
        />

        {/* Gold Trim Collar */}
        <path
          d="M 68 94 Q 80 106 92 94"
          fill="none"
          stroke="#facc15"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Tiny Adventurer Feet */}
        <ellipse cx="70" cy="138" rx="7" ry="4" fill="#312e81" />
        <ellipse cx="90" cy="138" rx="7" ry="4" fill="#312e81" />

        {/* ================= 3. HAIR BACK LAYER ================= */}
        <path
          d="M 40 60 C 35 100, 50 115, 60 110 C 65 85, 95 85, 100 110 C 110 115, 125 100, 120 60 Z"
          fill="url(#chibiHairGrad)"
        />

        {/* ================= 4. CHIBI HEAD & FACE ================= */}
        {/* Head base */}
        <circle cx="80" cy="66" r="34" fill="#fef08a" opacity="0.1" />
        <path
          d="M 46 62 C 44 85, 60 98, 80 98 C 100 98, 116 85, 114 62 C 114 40, 46 40, 46 62 Z"
          fill="#ffedd5"
          stroke="#fed7aa"
          strokeWidth="1.5"
        />

        {/* Cute Pink Blushing Cheeks */}
        <ellipse cx="58" cy="78" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.6" />
        <ellipse cx="102" cy="78" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.6" />

        {/* ================= 5. EXPRESSIVE ANIME EYES ================= */}
        {pose === 'think' ? (
          /* Thinking Eyes: Looking Up / Arc */
          <>
            <path d="M 58 68 Q 67 60 72 68" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 88 68 Q 93 60 102 68" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : pose === 'wave' || pose === 'jump' ? (
          /* Happy Joyful Arcs */
          <>
            <path d="M 58 72 Q 66 62 74 72" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 86 72 Q 94 62 102 72" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          /* Big Sparkling Anime Eyes */
          <>
            {/* Left Eye */}
            <g>
              <ellipse cx="64" cy="68" rx="7.5" ry="10" fill="#1e1b4b" />
              <ellipse cx="64" cy="71" rx="5.5" ry="6" fill="#818cf8" />
              {/* Eye Catch Sparkles */}
              <circle cx="62" cy="64" r="3" fill="#ffffff" />
              <circle cx="66" cy="72" r="1.5" fill="#ffffff" />
            </g>

            {/* Right Eye */}
            <g>
              <ellipse cx="96" cy="68" rx="7.5" ry="10" fill="#1e1b4b" />
              <ellipse cx="96" cy="71" rx="5.5" ry="6" fill="#818cf8" />
              {/* Eye Catch Sparkles */}
              <circle cx="94" cy="64" r="3" fill="#ffffff" />
              <circle cx="98" cy="72" r="1.5" fill="#ffffff" />
            </g>
          </>
        )}

        {/* Cute Anime Mouth */}
        {pose === 'jump' || pose === 'wave' ? (
          <path d="M 75 83 Q 80 91 85 83 Z" fill="#f43f5e" stroke="#1e1b4b" strokeWidth="1" />
        ) : (
          <path d="M 77 82 Q 80 86 83 82" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* ================= 6. ANIME FRONT HAIR BANGS ================= */}
        {/* Main bangs & twin sidelocks */}
        <path
          d="M 44 54 C 48 30, 112 30, 116 54 C 114 74, 108 72, 100 58 C 92 68, 84 62, 80 54 C 76 62, 68 68, 60 58 C 52 72, 46 74, 44 54 Z"
          fill="url(#chibiHairGrad)"
        />
        {/* Top Hair Ahoge / Cowlick Ribbon */}
        <path
          d="M 80 34 Q 95 18 84 12 Q 76 18 78 34"
          fill="none"
          stroke="#ec4899"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ================= 7. HANDS & GESTURES ================= */}
        {pose === 'wave' ? (
          /* Waving Left Hand */
          <g>
            <motion.path
              d="M 52 95 Q 40 80 44 70"
              fill="none"
              stroke="#ffedd5"
              strokeWidth="6"
              strokeLinecap="round"
              animate={{ rotate: [-15, 20, -15] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              style={{ originX: '52px', originY: '95px' }}
            />
            <circle cx="44" cy="70" r="4.5" fill="#ffedd5" />
          </g>
        ) : pose === 'point' ? (
          /* Pointing Right Hand with magical wand */
          <g>
            <path d="M 102 95 Q 120 85 130 80" fill="none" stroke="#ffedd5" strokeWidth="5" strokeLinecap="round" />
            <circle cx="130" cy="80" r="4" fill="#ffedd5" />
            {/* Magic Wand */}
            <line x1="126" y1="84" x2="148" y2="62" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <polygon points="148,58 152,65 144,65" fill="#facc15" filter="url(#chibiGlow)" />
          </g>
        ) : (
          /* Idle hands held near chest */
          <g>
            <circle cx="68" cy="98" r="4" fill="#ffedd5" />
            <circle cx="92" cy="98" r="4" fill="#ffedd5" />
          </g>
        )}

        {/* ================= 8. THEME-SPECIFIC ACCESSORIES ================= */}
        {/* CYBERPUNK: Glowing Neon Visor HUD */}
        {currentTheme === 'cyberpunk-neon' && (
          <g filter="url(#chibiGlow)">
            <rect x="52" y="60" width="56" height="15" rx="4" fill="rgba(6, 182, 212, 0.75)" stroke="#facc15" strokeWidth="1.5" />
            <line x1="56" y1="67" x2="104" y2="67" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="106" cy="67" r="2.5" fill="#facc15" />
          </g>
        )}

        {/* DARK DUNGEON: Arcane Sorcerer Cap */}
        {currentTheme === 'dark-dungeon' && (
          <g>
            <path d="M 52 38 Q 80 4 108 38 Z" fill="#4c1d95" stroke="#a855f7" strokeWidth="1.5" />
            <ellipse cx="80" cy="38" rx="30" ry="7" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
            <polygon points="80,18 83,23 77,23" fill="#c084fc" filter="url(#chibiGlow)" />
          </g>
        )}

        {/* COZY PINKISH: Rose Blossom Halo */}
        {currentTheme === 'cozy-pinkish' && (
          <g filter="url(#chibiGlow)">
            <ellipse cx="80" cy="24" rx="26" ry="6" fill="none" stroke="#fb7185" strokeWidth="2.5" />
            <circle cx="98" cy="22" r="4" fill="#f43f5e" />
            <circle cx="62" cy="22" r="3.5" fill="#f43f5e" />
          </g>
        )}

        {/* BILLIONAIRE GOLD: Radiant 24k Royal Crown */}
        {currentTheme === 'billionaire-gold' && (
          <g filter="url(#chibiGlow)">
            <path d="M 64 30 L 68 18 L 80 24 L 92 18 L 96 30 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="80" cy="23" r="2" fill="#38bdf8" />
            <circle cx="68" cy="18" r="1.5" fill="#ef4444" />
            <circle cx="92" cy="18" r="1.5" fill="#ef4444" />
          </g>
        )}

      </svg>
    </motion.div>
  );
}
