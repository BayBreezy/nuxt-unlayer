import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
  features: {
    tooling: true,
  },
})
  .override("nuxt/typescript/rules", {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
    ignores: ["dist", "node_modules"],
  })
  .override("nuxt/vue/rules", {
    rules: {
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names": "off",
    },
  });
