/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        lightGray: "#f0f0f0",
        "custom-green": "#449b44",
      },
      fontSize: {
        xsmall: "12px",
        small: "14px",
        large: "",
        heading: "48px",
      },
    },
  },
  plugins: [],
};
