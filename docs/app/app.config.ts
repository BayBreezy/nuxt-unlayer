export default defineAppConfig({
  docd: {
    github: {
      repo: "https://github.com/BayBreezy/nuxt-unlayer",
      branch: "main",
      contentDir: "docs/content",
    },
    ui: {
      header: {
        title: "Nuxt Unlayer",
        logo: {
          light: "/UnlayerIcon.png",
          dark: "/UnlayerIcon.png",
          alt: "Nuxt Unlayer",
        },
      },
      toc: { title: "On this page", icon: "lucide:list" },
      borderType: "dashed",
      extraLinks: [
        {
          icon: "lucide:play",
          label: "Live Demo",
          href: "/",
        },
        {
          icon: "lucide:coffee",
          label: "Buy me coffee",
          external: true,
          href: "https://buymeacoffee.com/llehXIrI8g",
        },
        {
          icon: "lucide:package",
          label: "npm",
          href: "https://www.npmjs.com/package/nuxt-unlayer",
          external: true,
        },
      ],
    },
  },
});
