// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css:['~/assets/globals.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/fonts'],
  future: { compatibilityVersion: 4 },
  nitro:{
    storage: {
      battles: {
        driver: 'memory',
      },
      pokemon: {
        driver: 'memory'
      }
    }
  },
})