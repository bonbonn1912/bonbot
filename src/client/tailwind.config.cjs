/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '17': '4.25rem', // Hier definieren wir den 1.5rem Zwischenschritt
      },
    },
  },
  plugins: [],
}
