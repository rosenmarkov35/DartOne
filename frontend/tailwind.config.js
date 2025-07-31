/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glowRed: {
          '0%': { backgroundColor: 'transparent'},
          '50%': { backgroundColor: 'rgb(255, 138, 138)'},
          '100%': { backgroundColor: 'transparent'},
        },
      },
      animation: {
        glowRed: 'glowRed 0.3s ease-in-out',
      },
      scale: {
        '40': '0.4',
        '107': '1.07',
      },
      colors: {
        'offwhite' : '#E4E4E7',
        'dark-gray': '#27272A',
        'light-gray': '#656567',
        

        'brick-50': '#F8D4C9',
        'brick-100': '#F6C6B6',
        'brick-200': '#F4B8A4',
        'brick-300': '#F2AA92',
        'brick-400': '#EF9C80',
        'brick-500': '#ED8E6E',
        'brick-600': '#E9724C',
        'brick-700': '#E66337',
        'brick-800': '#E45525',
        'brick-900': '#DA4B1B',
      },
      fontFamily: {
        'chakra': ['"Chakra Petch"', 'sans-serif'], // Add "Chakra Petch" font
      },
    },
  },
  plugins: [],
}