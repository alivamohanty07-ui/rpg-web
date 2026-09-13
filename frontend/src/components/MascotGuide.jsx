import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, Terminal, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MascotGuide({ activeLoreHint }) {
  const { currentTheme } = useTheme();

  // Mascot state
  const [dialogue, setDialogue] = useState({
    title: "PUFFI // REALM SPRITE",
    message: "Greetings, Adventurer! Welcome to the gateway of Power Puff RPG. Hover or click any realm, house, or attribute below to analyze heroic stats! ✨",
    mood: "TRANSMITTING",
    sprite: "🧚‍♀️"
  });

  // Track theme changes to react
  useEffect(() => {
    if (activeLoreHint) {
      setDialogue(activeLoreHint);
      return;
    }

    if (currentTheme === 'dark-dungeon') {
      setDialogue({
        title: "PUFFI // DUNGEON EXPLORER",
        message: "Watch your step! Arcane runes hum through ancient slate halls. Banish the procrastination specters with intense deep work! 🏰🔮",
        mood: "ARCANE // ACTIVE",
        sprite: "🧙‍♀️"
      });
    } else if (currentTheme === 'cyberpunk-neon') {
      setDialogue({
        title: "PUFFI // NETRUNNER AI",
        message: "High-octane cyber circuits engaged! Sync your daily tasks with neon hyper-drive to upgrade your cybernetic attributes! ⚡🕶️",
        mood: "OVERCLOCK // 99%",
        sprite: "🤖"
      });
    } else if (currentTheme === 'cozy-pinkish') {
      setDialogue({
        title: "PUFFI // BLOSSOM SPRITE",
        message: "A soft pastel sanctuary filled with gentle ambient kindness! Take a deep breath, drink water, and conquer your goals with joy! 🌸💖",
        mood: "HARMONY // TRANQUIL",
        sprite: "🧚‍♀️"
      });
    } else if (currentTheme === 'billionaire-gold') {
      setDialogue({
        title: "PUFFI // VAULT MASTER",
        message: "Pure prestige and gold-plated ambition! Every task completed mints shiny gold coins into your adventurer treasury! 👑🪙",
        mood: "PRESTIGE // 24K",
        sprite: "👑"
      });
    }
  }, [currentTheme, activeLoreHint]);

  return (
    <div className="relative z-30 max-w-3xl mx-auto px-4 my-10">
      <motion.div
        className="game-card hud-frame p-5 sm:p-6 rounded-3xl border-2 border-rpg-border/90 flex flex-col sm:flex-row items-center gap-5 backdrop-blur-2xl"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {/* Retro Game Character Portrait HUD */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-rpg-card to-rpg-bg border-2 border-rpg-accent flex items-center justify-center text-4xl sm:text-5xl shadow-theme-glow relative overflow-hidden"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
          >
            {/* Scanline texture over portrait */}
            <div className="absolute inset-0 scanline-texture opacity-40 pointer-events-none" />
            <span className="relative z-10 select-none drop-shadow-md">{dialogue.sprite || "🧚‍♀️"}</span>
            
            {/* Live Indicator Ping */}
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rpg-secondary animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rpg-secondary" />
          </motion.div>

          <div className="text-center mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rpg-bg border border-rpg-border text-rpg-accent">
              <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE GUIDE
            </span>
          </div>
        </div>

        {/* Tactical Game Dialogue Box */}
        <div className="flex-grow text-left w-full">
          {/* Header Strip */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-rpg-border/60">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-rpg-accent" />
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-rpg-text uppercase">
                {dialogue.title}
              </span>
            </div>
            
            <span className="font-tech font-bold text-[11px] px-2 py-0.5 rounded border border-rpg-accent/40 bg-rpg-accent/15 text-rpg-accent uppercase tracking-wider">
              {dialogue.mood}
            </span>
          </div>

          {/* Dynamic Dialogue Text */}
          <div className="min-h-[50px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={dialogue.message}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-xs sm:text-sm text-rpg-text/90 leading-relaxed font-normal"
              >
                "{dialogue.message}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Sub-bar Prompt */}
          <div className="mt-3 pt-2 border-t border-rpg-border/40 flex items-center justify-between text-[11px] font-tech text-rpg-muted">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-rpg-accent" />
              <span>TACTICAL TIP: Hover or click lore cards to trigger real-time transmissions</span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-rpg-secondary animate-pulse" />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
