/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins-Regular', 'sans-serif'],
        "Poppins-Bold": ['Poppins-Bold', 'sans-serif'],
        "Poppins-SemiBold": ['Poppins-SemiBold', 'sans-serif'],
        "Poppins-Medium": ['Poppins-Medium', 'sans-serif'],
        "Poppins-Light": ['Poppins-Light', 'sans-serif'],
        "Poppins-ExtraLight": ['Poppins-ExtraLight', 'sans-serif'],
        "Poppins-Italic": ['Poppins-Italic', 'sans-serif'],
        "Poppins-BoldItalic": ['Poppins-BoldItalic', 'sans-serif'],
        "Poppins-SemiBoldItalic": ['Poppins-SemiBoldItalic', 'sans-serif'],
        "Poppins-MediumItalic": ['Poppins-MediumItalic', 'sans-serif'],
        "Poppins-LightItalic": ['Poppins-LightItalic', 'sans-serif'],
        "Poppins-ExtraLightItalic": ['Poppins-ExtraLightItalic', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#042558',
          200: '#E2EAFF', 
        },
        acccent:{
          100:'#FFFFFF'
        },
        Black: {
          DEFAULT: '#000000',
        }
    },
  },
  plugins: [],
}
}