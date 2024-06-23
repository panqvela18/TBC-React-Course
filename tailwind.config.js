/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gray-opacity": "rgba(217, 217, 217, 0.1)",
      },
      textColor: {
        lightModeBg: "#adb5bd",
      },
    },
    screens: {
      md: { max: "1023px" },
      sm: { max: "640px" },
      xs: { max: "480px" },
    },
  },
  plugins: [],
  darkMode: "class",
};
