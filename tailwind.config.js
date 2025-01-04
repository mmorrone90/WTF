/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-yellow': '#D7FF34',
        'neon-cyan': '#00FFCA',
        'dark-grey': '#1A1A1A',
        'text-grey': '#A1A1A1',
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      spacing: {
        'section': '60px',
        'card': '16px',
        'button': '12px',
      },
      maxWidth: {
        'container': '1440px',
      },
      screens: {
        'desktop': '1440px',
        'tablet': '768px',
        'mobile': '480px',
      },
    },
  },
  plugins: [],
};