/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#001A33", // Deep luxury blue
          gold: "#C5A059", // Accent gold
          goldHover: "#B08D4B",
          gray: "#F8F9FA", // Light background
          dark: "#1A1A1A", // Text color
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
