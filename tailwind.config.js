const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      backgroundColor: {
        google: '#356df2',
        github: '#161b22',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['focus-visible'],
      outline: ['focus-visible'],
    },
  },
  plugins: [],
};
