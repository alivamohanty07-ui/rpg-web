import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Self-Contained Anime Mascot Component ("Pixel Buddy // Hero Scout")
 * 100% pure React SVG vector graphics directly in JSX with zero external assets.
 * 
 * Features:
 * - Dual Avatar Models:
 *    - 'emily': Chibi Angel/Fairy with wings, pink/violet gradient twin-tails, celestial halo.
 *    - 'ren': Chibi Knight/Cyber Mage with spiky blue hair, hero headband, and cyber-plate armor.
 * - Dynamic Poses: 'idle' | 'wave' | 'think' | 'point' | 'jump' | 'cyber' | 'sleep' | 'wake' | 'read'
 * - Animated 'Zzz' sleep motes & '!' wake alert badge.
 * - Dynamic 4-Realm theme accessory overlays for both characters.
 */
export default function AnimeMascot({ 
  character = 'emily', // 'emily' | 'ren'
  pose = 'idle',      // 'idle' | 'wave' | 'think' | 'point' | 'jump' | 'cyber' | 'sleep' | 'wake' | 'read'
  currentTheme = 'dark-dungeon',
  size = 120 
}) {
  // Motion animation for outer floating wrapper
  const floatAnimation = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
    },
    wave: {
      y: [0, -12, 0],
      rotate: [0, 6, -6, 4, 0],
      transition: { repeat: Infinity, duration: 1.4, ease: "easeInOut" }
    },
    think: {
      y: [0, -6, 0],
      rotate: [0, 5, 0],
      transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
    },
    point: {
      y: [0, -8, 0],
      x: [0, 6, 0],
      transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
    },
    jump: {
      y: [0, -22, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
    },
    cyber: {
      y: [0, -6, 0],
      x: [-2, 2, -1, 1, 0],
      transition: { repeat: Infinity, duration: 0.4, ease: "linear" }
    },
    sleep: {
      y: [0, 4, 0],
      rotate: [12, 16, 12],
      transition: { repeat: Infinity, duration: 4.0, ease: "easeInOut" }
    },
    wake: {
      y: [0, -16, 0],
      scale: [0.9, 1.25, 1.0],
      rotate: [-4, 4, 0],
      transition: { duration: 0.45, ease: "easeOut" }
    },
    read: {
      y: [0, -5, 0],
      rotate: [-3, 1, -3],
      transition: { repeat: Infinity, duration: 3.0, ease: "easeInOut" }
    }
  };

  const isSleeping = pose === 'sleep';
  const isWaking = pose === 'wake';

  return (
    <motion.div 
      className="relative flex items-center justify-center select-none"
      animate={floatAnimation[pose] || floatAnimation.idle}
      style={{ width: size, height: size }}
    >
      {/* Floating Animated 'Zzz' Sleep Particles */}
      <AnimatePresence>
        {isSleeping && (
          <div className="absolute -top-3 -right-2 pointer-events-none z-30 font-pixel font-bold">
            <motion.span
              className="absolute text-cyan-300 text-xs text-shadow-sm"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: -24, x: 10, scale: [0.6, 1.1, 1.3] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut", delay: 0 }}
            >
              Z
            </motion.span>
            <motion.span
              className="absolute text-indigo-300 text-[10px] text-shadow-sm"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], y: -34, x: 18, scale: [0.5, 1.0, 1.2] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut", delay: 0.8 }}
            >
              z
            </motion.span>
            <motion.span
              className="absolute text-pink-300 text-[8px] text-shadow-sm"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], y: -44, x: 26, scale: [0.4, 0.9, 1.1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut", delay: 1.6 }}
            >
              z
            </motion.span>
          </div>
        )}
      </AnimatePresence>

      {/* Startled Wake-up Exclamation Bubble */}
      <AnimatePresence>
        {isWaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: [1, 1.3, 1], y: -28 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute top-0 z-30 flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_15px_rgba(251,191,36,0.9)] text-slate-950 font-black text-sm"
          >
            !
          </motion.div>
        )}
      </AnimatePresence>

      <svg 
        viewBox="0 0 160 160" 
        className="w-full h-full overflow-visible drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Emily Hair Gradient */}
          <linearGradient id="emilyHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="60%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Ren Hair Gradient */}
          <linearGradient id="renHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          {/* Magical Wing Gradient */}
          <linearGradient id="mascotWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
            <stop offset="70%" stopColor="rgba(216, 180, 254, 0.8)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.45)" />
          </linearGradient>

          {/* Ren Armor Gradient */}
          <linearGradient id="renArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Ren Scarf / Capelet Gradient */}
          <linearGradient id="renScarf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Robe Gradient */}
          <linearGradient id="mascotRobe" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Glowing Aura Filter */}
          <filter id="mascotGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* CHARACTER 1: EMILY (Chibi Fairy / Angel)                                  */}
        {/* ========================================================================= */}
        {(character === 'emily' || character === 'aiko') && (
          <g id="emily-sprite">
            {/* 1. Glowing Celestial Halo */}
            <g filter="url(#mascotGlow)">
              <ellipse 
                cx="80" 
                cy="24" 
                rx="28" 
                ry="7" 
                fill="none" 
                stroke="#facc15" 
                strokeWidth="3" 
                opacity={isSleeping ? "0.4" : "0.9"} 
              />
              <circle cx="95" cy="22" r="3" fill="#ffffff" />
            </g>

            {/* 2. Fairy Wings */}
            <g filter="url(#mascotGlow)">
              {/* Left Wing */}
              <path
                d="M 68 76 C 30 40, 10 65, 30 95 C 45 110, 68 88, 68 76 Z"
                fill="url(#mascotWing)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                opacity={isSleeping ? "0.6" : "1"}
              />
              <path
                d="M 65 84 C 42 78, 28 96, 46 112 C 56 120, 66 96, 65 84 Z"
                fill="url(#mascotWing)"
                opacity="0.75"
              />

              {/* Right Wing */}
              <path
                d="M 92 76 C 130 40, 150 65, 130 95 C 115 110, 92 88, 92 76 Z"
                fill="url(#mascotWing)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                opacity={isSleeping ? "0.6" : "1"}
              />
              <path
                d="M 95 84 C 118 78, 132 96, 114 112 C 104 120, 94 96, 95 84 Z"
                fill="url(#mascotWing)"
                opacity="0.75"
              />
            </g>

            {/* 3. Robe & Body */}
            <path
              d="M 62 92 C 56 118, 52 136, 80 138 C 108 136, 104 118, 98 92 Z"
              fill="url(#mascotRobe)"
              stroke="#1e1b4b"
              strokeWidth="2"
            />
            {/* Gold Collar Trim */}
            <path
              d="M 68 94 Q 80 106 92 94"
              fill="none"
              stroke="#facc15"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Boots */}
            <ellipse cx="70" cy="138" rx="7" ry="4" fill="#1e1b4b" />
            <ellipse cx="90" cy="138" rx="7" ry="4" fill="#1e1b4b" />

            {/* 4. Hair Back Layer (Twin-tails) */}
            <path
              d="M 40 60 C 35 100, 50 115, 60 110 C 65 85, 95 85, 100 110 C 110 115, 125 100, 120 60 Z"
              fill="url(#emilyHair)"
            />

            {/* 5. Chibi Face */}
            <path
              d="M 46 62 C 44 85, 60 98, 80 98 C 100 98, 116 85, 114 62 C 114 40, 46 40, 46 62 Z"
              fill="#ffedd5"
              stroke="#fed7aa"
              strokeWidth="1.5"
            />

            {/* Blushing Cheeks */}
            <ellipse cx="58" cy="78" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.65" />
            <ellipse cx="102" cy="78" rx="5.5" ry="3.5" fill="#fb7185" opacity="0.65" />

            {/* 6. Eyes & Expressions */}
            {isSleeping ? (
              // Serene sleeping closed eyes
              <g>
                <path d="M 58 72 Q 64 77 70 72" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 90 72 Q 96 77 102 72" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : pose === 'think' || pose === 'read' ? (
              // Thinking squint
              <g>
                <path d="M 58 68 Q 67 60 72 68" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
                <path d="M 88 68 Q 93 60 102 68" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : pose === 'wave' || pose === 'jump' ? (
              // Joyful arcs
              <g>
                <path d="M 58 72 Q 66 62 74 72" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 86 72 Q 94 62 102 72" fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : (
              // Sparkling Anime Eyes
              <g>
                <ellipse cx="64" cy="68" rx="7" ry="9.5" fill="#1e1b4b" />
                <ellipse cx="64" cy="71" rx="5" ry="5.5" fill="#818cf8" />
                <circle cx="62" cy="65" r="2.8" fill="#ffffff" />
                <circle cx="66" cy="72" r="1.4" fill="#ffffff" />

                <ellipse cx="96" cy="68" rx="7" ry="9.5" fill="#1e1b4b" />
                <ellipse cx="96" cy="71" rx="5" ry="5.5" fill="#818cf8" />
                <circle cx="94" cy="65" r="2.8" fill="#ffffff" />
                <circle cx="98" cy="72" r="1.4" fill="#ffffff" />
              </g>
            )}

            {/* Mouth */}
            {isSleeping ? (
              <path d="M 77 82 Q 80 84 83 82" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
            ) : pose === 'jump' || pose === 'wave' ? (
              <path d="M 75 83 Q 80 91 85 83 Z" fill="#f43f5e" stroke="#1e1b4b" strokeWidth="1" />
            ) : (
              <path d="M 77 82 Q 80 86 83 82" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* 7. Front Hair Bangs & Ahoge */}
            <path
              d="M 44 54 C 48 30, 112 30, 116 54 C 114 74, 108 72, 100 58 C 92 68, 84 62, 80 54 C 76 62, 68 68, 60 58 C 52 72, 46 74, 44 54 Z"
              fill="url(#emilyHair)"
            />
            {/* Ahoge Antenna Curl */}
            <path
              d="M 80 34 Q 95 18 84 12 Q 76 18 78 34"
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* 8. Hands & Accessories */}
            {pose === 'wave' ? (
              <g>
                <path d="M 52 95 Q 40 80 44 70" fill="none" stroke="#ffedd5" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="44" cy="70" r="4.5" fill="#ffedd5" />
                <circle cx="92" cy="98" r="4" fill="#ffedd5" />
              </g>
            ) : pose === 'point' ? (
              <g>
                <circle cx="68" cy="98" r="4" fill="#ffedd5" />
                <path d="M 102 95 Q 120 85 130 80" fill="none" stroke="#ffedd5" strokeWidth="5" strokeLinecap="round" />
                <circle cx="130" cy="80" r="4" fill="#ffedd5" />
                {/* Star Wand */}
                <line x1="126" y1="84" x2="148" y2="62" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                <polygon points="148,58 152,65 144,65" fill="#facc15" filter="url(#mascotGlow)" />
              </g>
            ) : pose === 'read' ? (
              <g>
                {/* Arcane Spellbook */}
                <rect x="68" y="94" width="24" height="18" rx="2" fill="#4338ca" stroke="#facc15" strokeWidth="1.5" />
                <line x1="80" y1="94" x2="80" y2="112" stroke="#facc15" strokeWidth="1" />
                <circle cx="68" cy="98" r="3.5" fill="#ffedd5" />
                <circle cx="92" cy="98" r="3.5" fill="#ffedd5" />
              </g>
            ) : (
              <g>
                <circle cx="68" cy="98" r="4" fill="#ffedd5" />
                <circle cx="92" cy="98" r="4" fill="#ffedd5" />
              </g>
            )}

            {/* 9. Theme Headgear Overlays for Emily */}
            {currentTheme === 'cyberpunk-neon' && (
              <g filter="url(#mascotGlow)">
                <rect x="52" y="60" width="56" height="15" rx="4" fill="rgba(6, 182, 212, 0.75)" stroke="#facc15" strokeWidth="1.5" />
                <line x1="56" y1="67" x2="104" y2="67" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2" />
              </g>
            )}
            {currentTheme === 'dark-dungeon' && (
              <g>
                <path d="M 54 36 Q 80 4 106 36 Z" fill="#4c1d95" stroke="#a855f7" strokeWidth="1.5" />
                <ellipse cx="80" cy="36" rx="28" ry="7" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
                <polygon points="80,18 83,23 77,23" fill="#c084fc" filter="url(#mascotGlow)" />
              </g>
            )}
            {currentTheme === 'billionaire-gold' && (
              <g filter="url(#mascotGlow)">
                <path d="M 64 30 L 68 18 L 80 24 L 92 18 L 96 30 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="80" cy="23" r="2" fill="#38bdf8" />
              </g>
            )}
          </g>
        )}

        {/* ========================================================================= */}
        {/* CHARACTER 2: REN (Chibi Knight / Cyber Mage)                              */}
        {/* ========================================================================= */}
        {character === 'ren' && (
          <g id="ren-sprite">
            {/* 1. Flapping Adventurer Scarf / Capelet (Back layer) */}
            <g filter="url(#mascotGlow)">
              <path
                d="M 58 92 C 32 98, 24 125, 38 138 C 50 144, 60 120, 60 100 Z"
                fill="url(#renScarf)"
                opacity="0.85"
              />
              <path
                d="M 102 92 C 128 98, 136 125, 122 138 C 110 144, 100 120, 100 100 Z"
                fill="url(#renScarf)"
                opacity="0.85"
              />
            </g>

            {/* 2. Cyber-Knight Armor Tunic & Pauldrons */}
            <path
              d="M 60 92 C 54 116, 52 136, 80 138 C 108 136, 106 116, 100 92 Z"
              fill="url(#renArmor)"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Gold Chestplate Chevron Emblem */}
            <path
              d="M 72 102 L 80 114 L 88 102"
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Shoulder Pauldron */}
            <ellipse cx="56" cy="94" rx="9" ry="6" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Right Shoulder Pauldron */}
            <ellipse cx="104" cy="94" rx="9" ry="6" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Armored Combat Boots */}
            <path d="M 62 136 L 76 136 L 74 142 L 62 142 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <path d="M 84 136 L 98 136 L 98 142 L 86 142 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />

            {/* 3. Spiky Hair Back Layer */}
            <path
              d="M 36 60 L 26 44 L 40 46 L 36 28 L 54 36 L 68 20 L 80 32 L 92 20 L 106 36 L 124 28 L 120 46 L 134 44 L 124 60 Z"
              fill="url(#renHair)"
            />

            {/* 4. Chibi Face */}
            <path
              d="M 48 62 C 46 84, 60 98, 80 98 C 100 98, 114 84, 112 62 C 112 42, 48 42, 48 62 Z"
              fill="#fef08a"
              stroke="#fde047"
              strokeWidth="1.5"
            />

            {/* Hero Headband */}
            <path
              d="M 46 54 Q 80 50 114 54"
              fill="none"
              stroke="#dc2626"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Headband Gold Crest Badge */}
            <circle cx="80" cy="52" r="3.5" fill="#facc15" stroke="#b45309" strokeWidth="1" />

            {/* 5. Eyes & Expressions */}
            {isSleeping ? (
              // Sleeping closed line
              <g>
                <path d="M 58 72 Q 64 76 70 72" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 90 72 Q 96 76 102 72" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : pose === 'think' || pose === 'read' ? (
              // Analytical squint
              <g>
                <path d="M 58 67 L 70 70" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <path d="M 90 70 L 102 67" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : pose === 'wave' || pose === 'jump' ? (
              // Confident hero smile eyes
              <g>
                <path d="M 58 71 Q 65 63 72 71" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 88 71 Q 95 63 102 71" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : (
              // Heroic anime eyes (cyan iris with determined shine)
              <g>
                <ellipse cx="64" cy="69" rx="6.5" ry="8.5" fill="#0f172a" />
                <ellipse cx="64" cy="71" rx="4.5" ry="5" fill="#06b6d4" />
                <circle cx="62" cy="66" r="2.5" fill="#ffffff" />

                <ellipse cx="96" cy="69" rx="6.5" ry="8.5" fill="#0f172a" />
                <ellipse cx="96" cy="71" rx="4.5" ry="5" fill="#06b6d4" />
                <circle cx="94" cy="66" r="2.5" fill="#ffffff" />
              </g>
            )}

            {/* Mouth */}
            {isSleeping ? (
              <path d="M 77 82 Q 80 84 83 82" fill="none" stroke="#991b1b" strokeWidth="1.5" />
            ) : pose === 'jump' || pose === 'wave' ? (
              <path d="M 75 82 Q 80 89 85 82 Z" fill="#b91c1c" stroke="#0f172a" strokeWidth="1" />
            ) : (
              <path d="M 77 82 Q 82 85 84 81" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" />
            )}

            {/* 6. Front Spiky Hair Bangs */}
            <path
              d="M 46 54 L 54 66 L 62 52 L 72 70 L 80 50 L 88 68 L 98 52 L 106 66 L 114 54 Z"
              fill="url(#renHair)"
            />

            {pose === 'point' ? (
              <g>
                <circle cx="68" cy="98" r="4.5" fill="#38bdf8" />
                {/* Forward Pointing Crystal Energy Blade */}
                <path d="M 100 95 L 126 84" stroke="#e2e8f0" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="126" y1="84" x2="152" y2="72" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" filter="url(#mascotGlow)" />
                <polygon points="152,72 144,70 148,78" fill="#facc15" />
              </g>
            ) : pose === 'wave' ? (
              <g>
                <path d="M 52 95 Q 40 78 44 68" fill="none" stroke="#38bdf8" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="44" cy="68" r="4.5" fill="#fef08a" />
                <circle cx="92" cy="98" r="4.5" fill="#38bdf8" />
              </g>
            ) : pose === 'read' ? (
              <g>
                {/* Tactical Holographic Datapad */}
                <rect x="66" y="92" width="28" height="20" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" filter="url(#mascotGlow)" />
                <line x1="70" y1="97" x2="90" y2="97" stroke="#bae6fd" strokeWidth="1" strokeDasharray="2 1" />
                <line x1="70" y1="102" x2="86" y2="102" stroke="#38bdf8" strokeWidth="1" />
                <line x1="70" y1="107" x2="82" y2="107" stroke="#bae6fd" strokeWidth="1" />
                <circle cx="66" cy="98" r="4" fill="#38bdf8" />
                <circle cx="94" cy="98" r="4" fill="#38bdf8" />
              </g>
            ) : (
              <g>
                <circle cx="66" cy="98" r="4.5" fill="#38bdf8" />
                <circle cx="94" cy="98" r="4.5" fill="#38bdf8" />
              </g>
            )}

            {/* 8. Theme Headgear Overlays for Ren */}
            {currentTheme === 'cyberpunk-neon' && (
              <g filter="url(#mascotGlow)">
                {/* Holographic Tactical Monocle / Scanner */}
                <circle cx="96" cy="69" r="11" fill="rgba(6, 182, 212, 0.4)" stroke="#facc15" strokeWidth="1.5" />
                <line x1="96" y1="58" x2="96" y2="80" stroke="#facc15" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="85" y1="69" x2="107" y2="69" stroke="#facc15" strokeWidth="1" strokeDasharray="2 2" />
                {/* Cyber Comm Antenna */}
                <line x1="107" y1="69" x2="120" y2="58" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
                <circle cx="120" cy="58" r="2.5" fill="#facc15" />
              </g>
            )}
            {currentTheme === 'dark-dungeon' && (
              <g filter="url(#mascotGlow)">
                {/* Arcane Knight Horned Visor Crest */}
                <path d="M 52 50 L 40 28 L 56 36 L 80 44 L 104 36 L 120 28 L 108 50 Z" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="80" cy="44" r="3" fill="#a855f7" />
              </g>
            )}
            {currentTheme === 'billionaire-gold' && (
              <g filter="url(#mascotGlow)">
                {/* Gilded Dragon Circlet */}
                <path d="M 52 50 L 60 38 L 70 44 L 80 34 L 90 44 L 100 38 L 108 50 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="80" cy="40" r="2" fill="#ef4444" />
              </g>
            )}
          </g>
        )}
      </svg>
    </motion.div>
  );
}
