export default defineNuxtConfig({
  devtools: { enabled: true, telemetry: false },
  extends: ["@baybreezy/docd"],
  modules: ["../src/module"],
  compatibilityDate: "latest",
});
