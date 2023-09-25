export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    authSecret: process.env.SECRET,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@sidebase/nuxt-auth", "nuxt-icon"],
  css: ["~/assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  build: {
    transpile: ["vue-toastification"],
  },
});
