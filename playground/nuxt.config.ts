export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true, telemetry: false },

  modules: [
    "../src/module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
  ],

  css: ["@/assets/main.css"],
  compatibilityDate: "2024-10-08",

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "",
  },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
    ],
  },
});
