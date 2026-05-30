export default defineNuxtConfig({
  devtools: { enabled: true, telemetry: false },
  extends: ["@baybreezy/docd"],
  modules: ["../src/module"],
  compatibilityDate: "latest",
  llms: {
    domain: process.env.NUXT_SITE_URL || "http://localhost:3000",
    title: process.env.NUXT_SITE_NAME || "Nuxt Unlayer",
    description: "Module used to add the Unlayer email builder to your Nuxt app.",
    full: {
      title: process.env.NUXT_SITE_NAME || "Nuxt Unlayer",
      description: "Module used to add the Unlayer email builder to your Nuxt app.",
    },
  },
  site: {
    url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    name: process.env.NUXT_SITE_NAME || "Nuxt Unlayer",
  },
});
