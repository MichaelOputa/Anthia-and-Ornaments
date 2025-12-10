/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          800: '#92400e',
          900: '#78350f',
        },
      },
    },
  },
  plugins: [],
};
