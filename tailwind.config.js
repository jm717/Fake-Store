module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
  ".src/components/**/*.{js,ts,jsx,tsx}"
],
theme: {
  extend: {
    fontFamily:{
      sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'], // Custom font
        mono: ['Courier New', 'Lucida Console', 'monospace'], // Monospace font
        futura: ['Futura', 'sans-serif'],
        rale: ['Raleway', 'sans-serif'],
    },
    colors: {
      'primary': '#a35d4d',
      'primary-dark': '#A03920',
      'fs-stone': '#292726',
      'fs-grey': '#fafafa',
      'fs-grey-light': '#e3e3e3',
      'fs-grey-dark': '#585858',
    },
  },
},
plugins: [
  require('@tailwindcss/forms'),
],
}