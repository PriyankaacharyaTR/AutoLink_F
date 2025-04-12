/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'car-entrance': 'carEntrance 2s ease-out forwards',
      },
      keyframes: {
        carEntrance: {
          '0%': { transform: 'scale(0.1) translateZ(-1000px)', opacity: '0' },
          '50%': { transform: 'scale(1.2) translateZ(100px)', opacity: '0.8' },
          '100%': { transform: 'scale(1) translateZ(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};