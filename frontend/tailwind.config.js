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
        leaf: {
          50: '#EFF7F1',
          100: '#DDEFE1',
          400: '#3FA46A',
          500: '#2F8A57',
          600: '#1F5C3E',
          700: '#184A32',
          900: '#123524',
          950: '#0B2116',
        },
        ink: {
          400: '#6B7A70',
          500: '#4B584F',
          600: '#3B493F',
          700: '#29362E',
          800: '#202C25',
          900: '#16231C',
        },
        line: '#D8DED9',
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
