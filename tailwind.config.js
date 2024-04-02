/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: { max: "1023px" },

      sm: { max: "640px" },
    },
  },
  plugins: [],
};
