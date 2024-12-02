/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DD2727",
        secondary: "#f0f0f0",
        // background: "#",
        text: "#000",
        // white: "#fff",
        lightGray: "#f0f0f0",
        error: "#",
        success: "#",
      },
      fontSize: {
        small: "",
        base: "14px",
        large: "",
        heading: "",
      },
    },
  },
  plugins: [],
};
