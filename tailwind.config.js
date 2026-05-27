/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Extend font sizes to include larger options
        '8xl': '6rem',
        '9xl': '8rem',
        '10xl': '10rem',
      },
      colors: {
        brand: '#27B4C8',
        'brand-dark': '#1e96a8',
        'brand-light': '#e8f9fb',
        'brand-mid': '#d0f2f6',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out',
        slideInLeft: 'slideInLeft 0.8s ease-out',
        slideInRight: 'slideInRight 0.8s ease-out',
      },
    },
  },
  plugins: [],
}
