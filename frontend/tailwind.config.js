/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solara: {
          bg: '#FBFAF6',
          green: '#1F5C3E',
          'green-hover': '#184A32',
          stats: '#EFF3EC',
          body: '#4B584F',
          muted: '#6B7A70',
          heading: '#16231C',
          border: '#D8DED9',
        }
      },
      borderRadius: {
        '28': '28px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
