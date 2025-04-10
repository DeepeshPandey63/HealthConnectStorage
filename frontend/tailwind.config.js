/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratAlt: ['"Montserrat Alternates"', 'sans-serif'],
      },
      colors:{
        primary:'#1acc82',
      }
    },
  },
  plugins: [],
}