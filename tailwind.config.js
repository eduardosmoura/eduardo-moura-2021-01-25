module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'primary' : '#2296f3',
        'primary-light' : '#51abf4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}