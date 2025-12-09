/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'intimed-navy': '#003C71',
        'intimed-blue': '#0085CA',
        'intimed-orange': '#F9B233',
      }
    },
  },
  plugins: [],
}
