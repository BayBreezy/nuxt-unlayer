export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true, telemetry: false },
  modules: ["../src/module"],
  css: ["@/assets/main.css"],
  compatibilityDate: "2024-10-08",
});
