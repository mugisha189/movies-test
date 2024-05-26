/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2BD17E",
        error: "#EB5757",
        background: "#093545",
        inputColor: "#224957",
        cardColor: "#092C39",
      },
    },
  },
  plugins: [],
};
