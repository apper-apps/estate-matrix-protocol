/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        secondary: "#4B7BEC",
        accent: "#26D0CE",
        surface: "#FFFFFF",
        background: "#F7F9FC",
        success: "#27AE60",
        warning: "#F39C12",
        error: "#E74C3C",
        info: "#3498DB",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(0,0,0,0.1)',
        'elevation-2': '0 4px 16px rgba(0,0,0,0.12)',
        'elevation-3': '0 8px 24px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}