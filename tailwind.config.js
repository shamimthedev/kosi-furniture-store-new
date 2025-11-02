/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        secondary: ["var(--font-roboto)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      colors: {
        primary: '#2B303A',
        secondary: '#D59D6D',
        productBorder: '#E8E8E8',
        productTitle: '#1A1A1A',
        productPrice: '#FF4B37',
      },
    },
  },
  plugins: [],
}