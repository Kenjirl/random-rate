/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
        extend: {
            fontFamily: {
                'glass-antiqua': ['"Glass Antiqua"', 'cursive'],
                'macondo': ['"Macondo"', 'cursive'],
                'matemasie': ['"Matemasie"', 'cursive'],
                'quicksand': ['"Quicksand"', 'cursive'],
            }
        },
    },
  plugins: [],
}
