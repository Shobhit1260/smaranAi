/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
      transitionDelay: {
        '700': '700ms',
      },
      transitionDuration: {
        '3000': '3000ms',
      }
    },
  },
  plugins: [],
}

