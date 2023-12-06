/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#000",
        mist_gray: "#E0E0E0",
        "light-gray": "#9D9D9D",
        primary: "#5B3BCC",
        pressable: "#5D41DE",
        secondary: "#FFFF00"
      }
    }
  },
  plugins: []
};
