/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pickled-blue': '#2b3d4f',
        'curious-blue': '#3398db',
        'shamrock': '#2ecc70',
        'buttercup': '#f39c12',
        'cinnabar': '#e74c3c',
      }
    },
  },
  plugins: [],
}

