/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Normal colors
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        primary: "#B05AAD",
        secondary: "#FFFFFF26",
        background: "#FFFFFF",
        background2: "#F8F9FA",
        myBlue: "#005AD133",
        myRed: "#F2444433",
        tertiary: {
          DEFAULT: "YOUR_TERTIARY_COLOR_HEX",
        },
      },
    },
  },
  plugins: [],
};
