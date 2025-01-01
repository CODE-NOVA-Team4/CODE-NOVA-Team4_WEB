/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ku-dark-green': '#036B3F',
        'ku-light-green': '#B8D829',
        'ku-green': '#21BA45',
      },
      fontFamily: {
        'ibm': ['"IBM Plex Sans KR"', 'sans-serif'],
        'jua': ['Jua', 'sans-serif'],
        'noto': ['"Noto Sans KR"', 'sans-serif'],
        'poor': ['"Poor Story"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}