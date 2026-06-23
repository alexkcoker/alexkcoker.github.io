import type { Config } from 'tailwindcss';

/**
 * Design tokens ported verbatim from the original site's `:root` custom
 * properties so the recreation matches the source palette, radii and timing.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // Original collapses cards/typography at max-width:700px, so desktop
    // styles begin at 701px. Align `md:` to that exact breakpoint.
    screens: {
      md: '701px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        bg: '#0F1115',
        surface: '#151922',
        border: '#23283A',
        'text-primary': '#EDEFF3',
        'text-secondary': '#A6ADBB',
        accent: '#6EA8FF',
      },
      fontFamily: {
        main: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
      maxWidth: {
        prose: '70ch',
      },
      transitionTimingFunction: {
        ease: 'ease-out',
      },
      transitionDuration: {
        fast: '150ms',
        medium: '250ms',
      },
      boxShadow: {
        card: '0 16px 40px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
