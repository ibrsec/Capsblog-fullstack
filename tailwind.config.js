/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .8s ease-out forwards',
      },
    },
  },
  plugins: [],
}