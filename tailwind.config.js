/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: { 950: '#070b14', 900: '#0b1220', 800: '#121b2e', 700: '#1c2740' },
        gold: { 300: '#e9d8a6', 400: '#d9bf7a', 500: '#c9a55a', 600: '#a8843f' },
        ivory: { 50: '#fdfbf6', 100: '#f8f4ea', 200: '#efe7d6' },
      },
      keyframes: {
        'slow-zoom': { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.08)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'slow-zoom': 'slow-zoom 20s ease-out infinite alternate',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
