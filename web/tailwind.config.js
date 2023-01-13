/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sgm: ["SGM"],
        sgl: ["SGL"],
        sgb: ["SGB"],

      }
    },
  },
  plugins: [],
}