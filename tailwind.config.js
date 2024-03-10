/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: { max: "1024px" },

      sm: { max: "640px" },
    },
  },
  plugins: [],
};
