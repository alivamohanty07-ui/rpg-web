import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Dynamic RPG Themed Environmental Backdrop Engine
 * 100% self-contained pure React SVG vectors, CSS variables, layered gradients, and blending modes.
 * Zero external asset dependencies.
 * 
 * Themes:
 * - 🏰 Dark Dungeon: Gothic stone masonry arch borders, weathered stone brick patterns, crimson-purple shadows, floating embers.
 * - ⚡ Cyberpunk Neon: Circuit trace pathways with pulsing diodes, geometric wireframes, and synth-border tech brackets.
 * - 🌸 Cozy Pinkish: Dreamy pastel cloud clusters, fairy-tale castle silhouette, and floating heart/stardust motes.
 * - 👑 Billionaire Gold: Art Deco golden geometric line lattices, gilded chevron trims, and cascading 24k gold sparks.
 */
export default function ThemeBackdrop() {
  const { currentTheme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-colors duration-700">
      
      {/* ========================================================================= */}
      {/* 1. DARK DUNGEON: Gothic Stone Arches, Masonry Pattern, Crimson Embers     */}
      {/* ========================================================================= */}
      {currentTheme === 'dark-dungeon' && (
        <div className="absolute inset-0">
          {/* Base Atmospheric Dungeon Gradient: Deep slate into ominous crimson & arcane purple */}
          <div className="absolute inset-0 bg-[#070b12]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,28,135,0.25)_0%,_rgba(69,10,10,0.18)_45%,_#05080f_100%)]" />

          {/* SVG Definitions for Stone Masonry Pattern */}
          <svg className="absolute w-0 h-0">
            <defs>
              <pattern id="dungeonStoneMasonry" width="80" height="40" patternUnits="userSpaceOnUse">
                {/* Stone Bricks */}
                <rect width="80" height="40" fill="none" />
                <rect x="1" y="1" width="38" height="18" fill="rgba(147, 51, 234, 0.03)" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
                <rect x="41" y="1" width="38" height="18" fill="rgba(147, 51, 234, 0.03)" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
                <rect x="21" y="21" width="38" height="18" fill="rgba(147, 51, 234, 0.03)" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
                <rect x="-19" y="21" width="38" height="18" fill="rgba(147, 51, 234, 0.03)" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
                <rect x="61" y="21" width="38" height="18" fill="rgba(147, 51, 234, 0.03)" stroke="rgba(168, 85, 247, 0.08)" strokeWidth="1" />
              </pattern>
            </defs>
          </svg>

          {/* Weathered Stone Masonry Backdrop Layer */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20h80M40 0v20M20 20v20M60 20v20\' stroke=\'rgba(168,85,247,0.06)\' fill=\'none\' stroke-width=\'1\'/%3E%3C/svg%3E")' }}
          />

          {/* Gothic Stone Arch Vaulting along top of viewport */}
          <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-30">
            <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="w-full h-full">
              {/* Medieval Pointed Arch Ribs */}
              <path d="M 0 0 Q 300 120 600 0 Q 900 120 1200 0 L 1200 0 L 0 0 Z" fill="rgba(30, 27, 75, 0.6)" stroke="#a855f7" strokeWidth="2" />
              <path d="M 150 0 Q 300 80 450 0 M 750 0 Q 900 80 1050 0" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="1.5" fill="none" />
              {/* Keystone Rosettes */}
              <circle cx="300" cy="60" r="10" fill="#4c1d95" stroke="#c084fc" strokeWidth="1.5" />
              <circle cx="900" cy="60" r="10" fill="#4c1d95" stroke="#c084fc" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Stone Pier Column Borders (Left & Right margins) */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-8 border-r border-purple-500/20 bg-gradient-to-r from-purple-950/40 to-transparent" />
          <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-8 border-l border-purple-500/20 bg-gradient-to-l from-purple-950/40 to-transparent" />

          {/* Volumetric Purple & Crimson Ambient Cones */}
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-purple-600/15 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.32, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-rose-950/25 rounded-full blur-[130px]" />

          {/* Floating Dark Ember Sparks */}
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={`dungeon-ember-${i}`}
              className="absolute rounded-full bg-gradient-to-t from-purple-500 to-rose-400 shadow-[0_0_10px_#a855f7]"
              style={{
                width: 2 + (i % 3) * 2,
                height: 3 + (i % 4) * 2,
                left: `${(i * 19 + 6) % 94}%`,
                top: `${(i * 23 + 15) % 90}%`,
              }}
              animate={{
                y: [0, -55, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.85, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 5 + (i % 3) * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Ancient Rosette Window Watermark in corner */}
          <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full border-2 border-purple-500/10 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] animate-[spin_100s_linear_infinite]" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CYBERPUNK NEON: Circuit Pathways, Geometric Wireframes, Synth-Borders  */}
      {/* ========================================================================= */}
      {currentTheme === 'cyberpunk-neon' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#040711]" />

          {/* Isometric Cyber Grid */}
          <div 
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Retro Arcade Scanlines */}
          <div className="absolute inset-0 scanline-texture opacity-50 pointer-events-none" />

          {/* Glowing Vector Circuit Board Pathways (Top & Sides) */}
          <svg className="absolute inset-0 w-full h-full opacity-25">
            {/* Top-Left Circuit Traces */}
            <path d="M 0 60 L 120 60 L 160 100 L 320 100" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="320" cy="100" r="3.5" fill="#facc15" />
            <path d="M 0 140 L 90 140 L 130 180 L 220 180" fill="none" stroke="#ec4899" strokeWidth="1.5" />
            <circle cx="220" cy="180" r="3" fill="#06b6d4" />

            {/* Top-Right Circuit Traces */}
            <path d="M 100% 80 L calc(100% - 140px) 80 L calc(100% - 190px) 130 L calc(100% - 300px) 130" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
            <circle cx="calc(100% - 300px)" cy="130" r="3.5" fill="#facc15" />

            {/* Bottom-Left Traces */}
            <path d="M 0 calc(100% - 120px) L 140 calc(100% - 120px) L 180 calc(100% - 80px) L 340 calc(100% - 80px)" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="4 2" />
          </svg>

          {/* Synth-Border Tech Corner HUD Brackets */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-60" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400 opacity-60" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-400 opacity-60" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-400 opacity-60" />

          {/* Dual Cyan & Yellow Ambient Neon Spotlights */}
          <motion.div
            className="absolute top-10 left-1/4 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[130px]"
            animate={{ x: [-25, 25, -25], opacity: [0.18, 0.38, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[140px]"
            animate={{ x: [25, -25, 25], opacity: [0.12, 0.32, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Laser Frequency Scanline */}
          <motion.div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_15px_#06b6d4]"
            animate={{ y: ['0vh', '100vh'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COZY PINKISH: Dreamy Pastel Clouds, Castle Horizon Silhouette, Hearts  */}
      {/* ========================================================================= */}
      {currentTheme === 'cozy-pinkish' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#160910]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#331422_0%,_#1a0b13_60%,_#0f050b_100%)]" />

          {/* Dreamy Cloud SVG Layers (Top Header Atmosphere) */}
          <div className="absolute top-0 left-0 right-0 h-44 overflow-hidden opacity-30">
            <svg viewBox="0 0 1200 180" className="w-full h-full" preserveAspectRatio="none">
              <path 
                d="M 0 60 Q 150 0 300 60 Q 450 120 600 60 Q 750 0 900 60 Q 1050 120 1200 60 L 1200 0 L 0 0 Z" 
                fill="rgba(251, 113, 133, 0.3)" 
              />
              <path 
                d="M 0 90 Q 200 30 400 90 Q 600 150 800 90 Q 1000 30 1200 90 L 1200 0 L 0 0 Z" 
                fill="rgba(244, 114, 182, 0.2)" 
              />
            </svg>
          </div>

          {/* Distant Fairy-Tale Castle Silhouette (Bottom Horizon) */}
          <div className="absolute bottom-0 left-0 right-0 h-44 overflow-hidden opacity-20 pointer-events-none">
            <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full">
              {/* Spire Towers, Turrets & Castle Ramparts */}
              <path 
                d="M 0 200 L 0 160 L 80 160 L 80 120 L 110 80 L 140 120 L 140 160 L 250 160 L 250 100 L 280 40 L 310 100 L 310 160 L 480 160 L 480 130 L 520 70 L 560 130 L 560 160 L 720 160 L 720 90 L 760 30 L 800 90 L 800 160 L 960 160 L 960 110 L 1000 50 L 1040 110 L 1040 160 L 1200 160 L 1200 200 Z" 
                fill="#fb7185" 
              />
              {/* Little Castle Flags */}
              <line x1="280" y1="40" x2="280" y2="25" stroke="#fb7185" strokeWidth="2" />
              <polygon points="280,25 300,32 280,40" fill="#fda4af" />
              <line x1="760" y1="30" x2="760" y2="15" stroke="#fb7185" strokeWidth="2" />
              <polygon points="760,15 780,22 760,30" fill="#fda4af" />
            </svg>
          </div>

          {/* Soft Pastel Ambient Spotlights */}
          <motion.div
            className="absolute top-24 left-1/3 w-[650px] h-[550px] bg-rose-500/18 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-24 right-1/4 w-[550px] h-[550px] bg-pink-500/15 rounded-full blur-[140px]"
            animate={{ scale: [1.18, 1, 1.18], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating Pastel Hearts, Bubbles & Stars */}
          {['🌸', '💖', '🫧', '✨', '⭐', '🌸', '💖', '🫧'].map((sym, i) => (
            <motion.div
              key={`cozy-mote-${i}`}
              className="absolute text-sm select-none opacity-45 drop-shadow-[0_0_8px_rgba(251,113,133,0.45)]"
              style={{
                left: `${(i * 22 + 7) % 92}%`,
                top: `${(i * 26 + 12) % 85}%`,
              }}
              animate={{
                y: [0, -32, 0],
                rotate: [-10, 10, -10],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut'
              }}
            >
              {sym}
            </motion.div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. BILLIONAIRE GOLD: Art Deco Geometrics, Gilded Trims, Cascading Gold    */}
      {/* ========================================================================= */}
      {currentTheme === 'billionaire-gold' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#030303]" />

          {/* Art Deco Interlocking Diamond Lattice Background */}
          <div 
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0 L60 30 L30 60 L0 30 Z M30 10 L50 30 L30 50 L10 30 Z\' stroke=\'%23facc15\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")',
              backgroundSize: '60px 60px'
            }}
          />

          {/* Gilded Art Deco Top Header Chevron Trim */}
          <div className="absolute top-0 left-0 right-0 h-28 overflow-hidden opacity-25">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              {/* Art Deco Sunburst Fan */}
              <path d="M 600 0 L 520 80 L 600 100 L 680 80 Z" fill="none" stroke="#facc15" strokeWidth="2" />
              <line x1="600" y1="0" x2="600" y2="100" stroke="#facc15" strokeWidth="1.5" />
              <line x1="600" y1="0" x2="560" y2="90" stroke="#facc15" strokeWidth="1" />
              <line x1="600" y1="0" x2="640" y2="90" stroke="#facc15" strokeWidth="1" />
              <line x1="0" y1="20" x2="1200" y2="20" stroke="#eab308" strokeWidth="1.5" strokeDasharray="12 4" />
              <line x1="0" y1="26" x2="1200" y2="26" stroke="#ca8a04" strokeWidth="1" />
            </svg>
          </div>

          {/* Gilded Corner Filigree Accents */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-amber-400 opacity-60">
            <div className="w-8 h-8 border-t border-l border-amber-300 m-1" />
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-400 opacity-60">
            <div className="w-8 h-8 border-t border-r border-amber-300 m-1 ml-auto" />
          </div>

          {/* Radiant 24k Gold Volumetric Light Cones */}
          <motion.div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/14 rounded-full blur-[140px]"
            animate={{ opacity: [0.15, 0.38, 0.15], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cascading 24k Gold Coin Sparks */}
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={`gold-spark-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_10px_#f59e0b]"
              style={{
                width: 3 + (i % 3) * 2,
                height: 3 + (i % 3) * 2,
                left: `${(i * 17 + 5) % 94}%`,
                top: `${(i * 21 + 8) % 88}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, (i % 2 === 0 ? 12 : -12), 0],
                opacity: [0.2, 0.95, 0.2]
              }}
              transition={{
                duration: 4.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Rotating Gilded Sunburst Emblem */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full border border-amber-500/10 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] animate-[spin_120s_linear_infinite]" />
        </div>
      )}

    </div>
  );
}
