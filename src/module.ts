import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit";
import { name, version } from "../package.json";
import chalk from "chalk";
import consola from "consola";

const logger = consola.withScope("nuxt:unlayer");

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
    });
    logger.success(chalk.greenBright("Unlayer component added to your app"));
  },
});
