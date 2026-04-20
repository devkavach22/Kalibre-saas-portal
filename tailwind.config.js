/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Critical for Dark/Light hybrid
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D32F2F",
          black: "#0F0F0F",
          grey: "#E5E7EB",
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(211, 47, 47, 0.4)' },
          '50%': { opacity: .7, boxShadow: '0 0 40px rgba(211, 47, 47, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}