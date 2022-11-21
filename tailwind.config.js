/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#0E5E6F",
        secondary: "#3A8891",
        third: "#F2DEBA",
        fourth: "#FFEFD6",
      },
      fontFamily: {
        sans: ["Sarabun", "sans-serif"],
      },
    },
  },
  plugins: [],
  important: true,
};
