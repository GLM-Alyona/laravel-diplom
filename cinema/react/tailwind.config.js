/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'guest': "url('../src/img/guest-background.jpg')"
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}
