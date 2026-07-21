/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
        anton: ['"Anton SC"', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#000000',
          card: '#0a0a0c',
          border: 'rgba(255, 255, 255, 0.1)',
          cyan: '#00f3ff',
          red: '#ff0055',
          amber: '#ffaa00',
          green: '#00ff66',
        }
      }
    },
  },
  plugins: [],
}
