/** @type {import('tailwindcss').Config} */
export default {
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
        },
        // Dashboard-only tokens (used by src/pages/dashboard & src/components/dashboard)
        forest: {
          700: '#14573f',
          800: '#0f4433',
          900: '#0a3226',
          950: '#06231a',
        },
        leaf: {
          50: '#f1faf4',
          100: '#e3f6ea',
          400: '#4dc684',
          500: '#24b368',
          600: '#1e9e5a',
          700: '#1a8a4f',
        },
        ink: {
          400: '#8a978f',
          600: '#5b6b62',
          700: '#3d4a42',
          900: '#142117',
        },
        line: '#e7ede9',
        'amber-accent': '#f0a94e',
        'blue-accent': '#4a8fe0',
        'violet-accent': '#9066e0',
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
