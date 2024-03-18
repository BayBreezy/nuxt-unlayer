import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";
import { name, version } from "../package.json";

// Module options TypeScript inteface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "unlayer",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    // add unlayer to script tags
    nuxt.options.app.head.script?.push({
      src: "https://editor.unlayer.com/embed.js",
    });
    // create resolver
    const resolver = createResolver(import.meta.url);

    // Add editor component
    addComponent({
      name: "EmailEditor",
      filePath: resolver.resolve("./runtime/components/EmailEditor.vue"),
      mode: "client",
    });
  },
});
