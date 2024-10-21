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

  icon: { clientBundle: { scan: true, sizeLimitKb: 0 } },
  compatibilityDate: "2024-10-08",
  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "", preference: "light", fallback: "light" },

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },
  build: { transpile: ["vue-sonner"] },
});
