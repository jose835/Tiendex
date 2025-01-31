/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#252525",
        whiting: '#6b6b6b',
        whiting2: '#ebebeb',
        graying: '#808080',
        redprimary: '#d70000',
        redsecondary: '#ffabab',
        darkred: '#d10000',
        blueprimary: '#005bd3',
        bluesecondary: '#4781ce',
        greenprimary: '#affebf',
        darkgreen: '#014b40'
      },
      boxShadow: {
        'default': '0rem -.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem .0625rem rgba(0, 0, 0, .1) inset, 0rem .03125rem 0rem .09375rem #FFF inset',
        'pressed': '-0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, .122) inset, 0.0625rem 0rem 0.0625rem 0rem rgba(26, 26, 26, .122) inset, 0rem .125rem 0.0625rem 0rem rgba(26, 26, 26, .2) inset',
        'button-primary': '0rem -.0625rem 0rem .0625rem rgba(0, 0, 0, .8) inset, 0rem 0rem 0rem .0625rem rgba(48, 48, 48, 1) inset, 0rem .03125rem 0rem .09375rem rgba(255, 255, 255, .25) inset',
        'button-primary-hover': '0rem .0625rem 0rem 0rem rgba(255, 255, 255, .24) inset, .0625rem 0rem 0rem 0rem rgba(255, 255, 255, .2) inset, -.0625rem 0rem 0rem 0rem rgba(255, 255, 255, .2) inset, 0rem -.0625rem 0rem 0rem #000 inset, 0rem -.0625rem 0rem .0625rem #1A1A1A',
        'button-primary-pressed': '0rem .1875rem 0rem 0rem rgb(0, 0, 0) inset',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, .15) 100%)',
        'gradient-primary-hover': 'linear-gradient(180deg, rgba(48, 48, 48, 0) 63.53%, rgba(255, 255, 255, .15) 100%), rgba(26, 26, 26, 1)',
      },
      backgroundColor: {
        'gradient-primary-base': 'rgba(48, 48, 48, 1)', // color base
      },
    },
  },
  plugins: [],
}
