// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  ssr: true,

  css: ["@/assets/css/inter.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@nuxt/image",
    "nuxt-simple-sitemap",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
    "nuxt-simple-sitemap",
    "nuxt-schema-org",
  ],

  headlessui: {
    prefix: "Headless",
  },

  image: {
    provider: "unsplash",
  },
});
