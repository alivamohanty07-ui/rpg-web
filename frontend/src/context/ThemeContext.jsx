import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'dark-dungeon',
    className: 'theme-dark-dungeon',
    name: 'Dark Dungeon',
    bg: '#0f172a',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.45)',
    icon: '🏰',
    badge: 'Mystic Slate & Purple',
    description: 'Ancient dungeon carved in dark slate with glowing arcane purple runes'
  },
  {
    id: 'cyberpunk-neon',
    className: 'theme-cyberpunk-neon',
    name: 'Cyberpunk Neon',
    bg: '#090d16',
    accent: '#06b6d4',
    secondaryAccent: '#eab308',
    glow: 'rgba(6, 182, 212, 0.5)',
    icon: '⚡',
    badge: 'Neon Cyan & Yellow',
    description: 'High-octane neon city with pulsing electric cyan and yellow highlights'
  },
  {
    id: 'cozy-pinkish',
    className: 'theme-cozy-pinkish',
    name: 'Cozy Pinkish',
    bg: '#1f1216',
    accent: '#fb7185',
    glow: 'rgba(251, 113, 133, 0.45)',
    icon: '🌸',
    badge: 'Rose & Pastel Pink',
    description: 'Comforting warm rose sanctuary infused with sweet blossom highlights'
  },
  {
    id: 'billionaire-gold',
    className: 'theme-billionaire-gold',
    name: 'Billionaire Gold',
    bg: '#000000',
    accent: '#eab308',
    glow: 'rgba(234, 179, 8, 0.55)',
    icon: '👑',
    badge: 'Pitch Black & Gold',
    description: 'Ultra-prestigious deep black monolith with radiant 24k gold brilliance'
  }
];

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Load saved theme or default to 'dark-dungeon'
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('power_puff_theme');
      return saved || 'dark-dungeon';
    } catch {
      return 'dark-dungeon';
    }
  });

  // Dynamically inject the selected theme class into document.documentElement root
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove any previous theme classes
    THEMES.forEach(t => root.classList.remove(t.className));
    
    // Find active theme definition
    const active = THEMES.find(t => t.id === currentTheme) || THEMES[0];
    root.classList.add(active.className);
    root.setAttribute('data-theme', active.id);

    try {
      localStorage.setItem('power_puff_theme', active.id);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [currentTheme]);

  const activeThemeObj = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  const setTheme = (themeId) => {
    if (THEMES.some(t => t.id === themeId)) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      activeTheme: activeThemeObj,
      setTheme,
      themes: THEMES
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
