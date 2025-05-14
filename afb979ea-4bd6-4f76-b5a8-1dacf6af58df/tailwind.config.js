export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#edfaf8',
          100: '#d1f3ed',
          200: '#a7e8db',
          300: '#6dd6c3',
          400: '#3bbda7',
          500: '#1ABC9C',
          600: '#0e9d81',
          700: '#0c7c68',
          800: '#0c6354',
          900: '#0c5347',
          950: '#042f29',
        },
        gray: {
          750: '#2a374a',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
}