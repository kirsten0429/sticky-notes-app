/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      colors: {
        paper: '#fdfbf7',
      }
    },
  },
  plugins: [],
}