// tailwind.config.cjs
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(260, 80%, 60%)",
        secondary: "hsl(340, 70%, 55%)"
      }
    }
  },
  plugins: []
};
