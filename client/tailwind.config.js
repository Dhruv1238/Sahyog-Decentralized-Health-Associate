const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'color1': '#ffffff',
        'color2': '#64C2EC',
        'color3': '#20ABE9',
        'color4': '#B8F5FF',
        'checkboxcolor': '#666D74',
        'bubblecolor': '#363636',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
});