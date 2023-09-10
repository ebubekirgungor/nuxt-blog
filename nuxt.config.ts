export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
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
  css: ['~/assets/css/main.css'],
})
