/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'major': 'Lora, Helvetica, sans-serif',
        'regular': 'Poppins, Helvetica, sans-serif',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
