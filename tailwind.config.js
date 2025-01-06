const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include Vite's entry file
    "./src/**/*.{js,ts,jsx,tsx}", // Include source files
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Include NextUI theme files
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Enables dark mode with class
  plugins: [nextui()], // NextUI Tailwind plugin
};
