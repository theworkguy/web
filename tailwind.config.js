/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"EB Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        black: '#0a0a0a',
        'dark-gray': '#1a1a1a',
        'medium-gray': '#2a2a2a',
        'light-gray': '#888888',
        'off-white': '#f0f0f0',
        primary: {
          DEFAULT: '#c10101',
          hover: '#e00000',
          dark: '#8a0101',
        },
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(193, 1, 1, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};