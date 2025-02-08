/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'blue': {
          '500': '#3B82F6',
        },
        'purple': {
          '600': '#7C3AED',
        },
      },
    },
  },
  plugins: [],
} 