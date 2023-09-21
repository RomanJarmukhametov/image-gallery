module.exports = {
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  corePlugins: {
    aspectRatio: false,
  },

  plugins: [require("@tailwindcss/forms", "@tailwindcss/aspect-ratio")],
  theme: {
    fontFamily: {
      sans: "Inter, sans-serif",
    },
    extend: {
      colors: {
        primary50: "#EFF8FE",
        primary100: "#DFF1FD",
        primary200: "#B9E5FC",
        primary300: "#7DD2FB",
        primary400: "#38BCF7",
        primary500: "#069CDF",
        primary600: "#0283C5",
        primary700: "#0368A0",
        primary800: "#075884",
        primary900: "#0C496C",
      },
    },
  },
};
