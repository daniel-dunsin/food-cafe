/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f64e32",
      },
    },
  },
  plugins: [],
};
