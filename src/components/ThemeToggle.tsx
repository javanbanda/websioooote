'use client';

import { useTheme } from './ThemeProvider';

type Theme = 'light' | 'dark' | 'system';

const NEXT_THEME: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

const LABEL: Record<Theme, string> = {
  light: 'LT',
  dark: 'DK',
  system: 'SY',
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(NEXT_THEME[theme])}
      aria-label={`Switch theme, current: ${theme}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'white',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.4)',
        padding: '4px 8px',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
      }}
    >
      {LABEL[theme]}
    </button>
  );
}
