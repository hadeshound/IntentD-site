import type { Config } from 'tailwindcss';

/**
 * The palette is defined here in full rather than leaning on Tailwind's
 * defaults, so the product has a recognisable surface instead of the
 * blue-violet look every starter template ships with.
 *
 * void      — page background, a deep navy rather than pure black
 * carbon    — card layers, two steps above the background
 * mint      — the single accent: money, and a green light on privacy
 * violet    — used only for ambient glow, never as a button fill
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,ts,tsx,js,jsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0B0F17',
          deep: '#070A10',
        },
        carbon: {
          800: '#111827',
          700: '#1F2937',
          600: '#2A3644',
        },
        mint: {
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        violet: {
          400: '#818CF8',
          500: '#6366F1',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#9CA3AF',
          faint: '#6B7280',
        },
        hairline: 'rgba(255, 255, 255, 0.08)',
        'hairline-strong': 'rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        display: ['var(--font-golos)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Hero type scales with the viewport instead of snapping between
        // breakpoints, which is what keeps 80-120px readable on a laptop.
        hero: ['clamp(2.5rem, 5.4vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'section-title': ['clamp(2rem, 4.2vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'card-title': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      borderRadius: {
        card: '12px',
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
        lift: '0 24px 60px -32px rgba(0, 0, 0, 0.9)',
        'mint-glow': '0 0 0 1px rgba(16, 185, 129, 0.35), 0 24px 70px -40px rgba(16, 185, 129, 0.6)',
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
