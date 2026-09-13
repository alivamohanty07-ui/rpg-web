import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Radio, HelpCircle, Terminal, Zap, Heart, Sword, Compass, Brain } from 'lucide-react';
import AnimeMascot from './AnimeMascot';
import { useTheme } from '../context/ThemeContext';

export default function InteractiveCompanion({ activeLoreHint, onQuickPrompt }) {
  const { currentTheme } = useTheme();

  // Internal companion state
  const [pose, setPose] = useState('idle'); // 'idle' | 'wave' | 'think' | 'point' | 'jump' | 'cyber'
  const [dialogue, setDialogue] = useState({
    title: "PIXEL BUDDY // HERO SCOUT",
    message: "Hiiii, Adventurer! I'm Pixel Buddy, your anime guide! Hover over or click any guild house, attribute, or realm to see my tactical scouting tips! ✨",
    mood: "SCOUT // ACTIVE",
    pose: "wave"
  });

  // React to theme changes & activeLoreHint props
  useEffect(() => {
    if (activeLoreHint) {
      setDialogue(activeLoreHint);
      setPose(activeLoreHint.pose || 'point');
      return;
    }

    if (currentTheme === 'dark-dungeon') {
      setDialogue({
        title: "PIXEL BUDDY // DUNGEON SCOUT",
        message: "Watch your step! Arcane dungeon runes hum through ancient slate halls. Slay the procrastination specters with focused sprints! 🏰🔮",
        mood: "ARCANE // MYSTIC",
        pose: "think"
      });
      setPose('think');
    } else if (currentTheme === 'cyberpunk-neon') {
      setDialogue({
        title: "PIXEL BUDDY // CYBER SCOUT",
        message: "Systems initialized! Time to jack into the Cyberpunk Grid! Boost your daily XP with neon overdrive! ⚡🕶️",
        mood: "OVERCLOCK // 99%",
        pose: "cyber"
      });
      setPose('cyber');
    } else if (currentTheme === 'cozy-pinkish') {
      setDialogue({
        title: "PIXEL BUDDY // BLOSSOM FAIRY",
        message: "A soft pastel sanctuary filled with gentle ambient kindness! Take a deep breath, drink water, and conquer your goals with joy! 🌸💖",
        mood: "HARMONY // TRANQUIL",
        pose: "wave"
      });
      setPose('wave');
    } else if (currentTheme === 'billionaire-gold') {
      setDialogue({
        title: "PIXEL BUDDY // VAULT SCOUT",
        message: "Pure prestige and gold-plated ambition! Every task completed mints shiny gold coins into your adventurer treasury! 👑🪙",
        mood: "PRESTIGE // 24K",
        pose: "jump"
      });
      setPose('jump');
    }
  }, [currentTheme, activeLoreHint]);

  // Click companion for instant cute cheer reaction
  const handlePokeCompanion = () => {
    setPose('jump');
    setDialogue({
      title: "PIXEL BUDDY // CHEERING!",
      message: "Kyaaa! You tapped me! I believe in you, hero! Let's conquer today's quest log together! 💖✨",
      mood: "HYPED // 100%",
      pose: "jump"
    });
    setTimeout(() => {
      setPose('idle');
    }, 2500);
  };

  return (
    <div className="relative z-30 max-w-4xl mx-auto px-4 my-10">
      <motion.div
        className="game-card hud-frame p-5 sm:p-6 rounded-3xl border-2 border-rpg-border/90 flex flex-col md:flex-row items-center gap-6 backdrop-blur-2xl transition-all duration-500 hover:border-rpg-accent"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {/* Animated Anime Chibi Sprite Stage */}
        <div 
          onClick={handlePokeCompanion}
          className="relative flex-shrink-0 cursor-pointer group flex flex-col items-center"
          title="Click to interact with Pixel Buddy!"
        >
          <div className="relative p-2 rounded-3xl bg-gradient-to-b from-rpg-card to-rpg-bg border-2 border-rpg-accent shadow-theme-glow group-hover:scale-105 transition-transform duration-300">
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanline-texture opacity-30 pointer-events-none rounded-3xl" />
            
            {/* Anime Mascot Graphic */}
            <AnimeMascot pose={pose} currentTheme={currentTheme} size={110} />

            {/* Live Indicator Ping */}
            <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-rpg-secondary animate-ping" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rpg-secondary" />
          </div>

          <motion.span 
            className="mt-2 inline-flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rpg-bg border border-rpg-border text-rpg-accent group-hover:border-rpg-accent"
            whileHover={{ scale: 1.05 }}
          >
            <Radio className="w-2.5 h-2.5 animate-pulse" /> POKE COMPANION
          </motion.span>
        </div>

        {/* Tactical Speech Bubble Box */}
        <div className="flex-grow text-left w-full">
          {/* Top Status Strip */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-rpg-border/60">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-rpg-accent" />
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider text-rpg-text uppercase">
                {dialogue.title}
              </span>
            </div>
            
            <span className="font-tech font-bold text-[11px] px-2.5 py-0.5 rounded border border-rpg-accent/40 bg-rpg-accent/15 text-rpg-accent uppercase tracking-wider shadow-sm">
              {dialogue.mood}
            </span>
          </div>

          {/* Dynamic Dialogue Text */}
          <div className="min-h-[60px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={dialogue.message}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="font-sans text-xs sm:text-sm text-rpg-text/90 leading-relaxed font-medium"
              >
                "{dialogue.message}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Quick Interaction Action Chips */}
          <div className="mt-3 pt-3 border-t border-rpg-border/40 flex flex-wrap items-center gap-2">
            <span className="font-tech text-[10px] uppercase font-bold text-rpg-muted mr-1">
              ASK SCOUT:
            </span>

            {[
              { label: 'Deep Work Tips', icon: Brain, id: 'intellect' },
              { label: 'House Blossom', icon: Heart, id: 'blossom' },
              { label: 'House Buttercup', icon: Sword, id: 'buttercup' },
              { label: '3-Step Map', icon: Compass, id: 'journey' },
            ].map((chip) => {
              const Icon = chip.icon;
              return (
                <motion.button
                  key={chip.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onQuickPrompt && onQuickPrompt(chip.id)}
                  className="px-2.5 py-1 rounded-lg bg-rpg-bg/80 border border-rpg-border hover:border-rpg-accent text-[11px] font-tech font-bold tracking-wider text-rpg-text flex items-center gap-1 transition-colors"
                >
                  <Icon className="w-3 h-3 text-rpg-accent" />
                  <span>{chip.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
