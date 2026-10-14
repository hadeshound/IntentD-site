import type { Config } from 'tailwindcss';

/**
 * Palette. A near-black neutral surface, one brand gradient taken from the
 * logo mark (teal to blue), and nothing else. The `mint` and `violet` token
 * names are kept so every component carries over; their values are the
 * brand teal and brand blue.
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,ts,tsx,js,jsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#080B10',
          deep: '#05070A',
        },
        carbon: {
          800: '#0E1218',
          700: '#161B23',
          600: '#222934',
        },
        mint: {
          200: '#B4EEE1',
          300: '#8CE3D0',
          400: '#52CDB2',
          500: '#35C4A6',
          600: '#2A9FA0',
          700: '#217D96',
        },
        violet: {
          400: '#6BAEE3',
          500: '#3A8FCB',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#98A2B3',
          faint: '#7D8797',
        },
        hairline: 'rgba(255, 255, 255, 0.07)',
        'hairline-strong': 'rgba(255, 255, 255, 0.14)',
      },
      fontFamily: {
        display: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Role scale (Geist, one family). Display is capped at 5rem; every
        // role scales with the viewport between a phone and a wide desktop.
        hero: ['clamp(2.5rem, 1rem + 4.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'section-title': ['clamp(2rem, 1.3rem + 2.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'card-title': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.012em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.01em' }],
      },
      borderRadius: {
        card: '14px',
        control: '10px',
        pill: '999px',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },
      maxWidth: {
        shell: '84rem',
      },
      transitionTimingFunction: {
        surface: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'status-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%': { transform: 'scale(2.4)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'glow-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.06)' },
        },
        'caret-blink': {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'status-ping': 'status-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'glow-drift': 'glow-drift 18s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
      },
      boxShadow: {
        lift: '0 16px 40px -24px rgba(0, 0, 0, 0.8)',
        'mint-glow': '0 8px 24px -12px rgba(53, 196, 166, 0.5)',
      },
      backgroundImage: {
        'hairline-grid':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
