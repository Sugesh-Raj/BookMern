export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#FFCE1A',
        'secondary' : '#0D0842',
        'black86': '#F3F3F3',
        'favourite': '#FF5841'
      },
      fontFamily:{
        'primary': ["Poppins", "sans-serif"],
      'secondary': ["Inter", "sans-serif"]

      }
    },
  },
  plugins: [],
}
