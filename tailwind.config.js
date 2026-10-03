/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050505',
          900: '#080808',
          850: '#0d0d0d',
          800: '#121212',
          700: '#1a1a1a',
          600: '#262626',
        },
        warm: {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#ede6da',
          300: '#ded4c3',
          400: '#c5b7a1',
        },
        mutedrose: {
          300: '#d9bcb4',
          400: '#c29d93',
          500: '#a87f75',
          600: '#875d54',
        },
        champagne: {
          300: '#e8dbb8',
          400: '#d8c596',
          500: '#bfab78',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Italiana"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
