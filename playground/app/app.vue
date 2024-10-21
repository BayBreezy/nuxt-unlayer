<template>
  <main class="main">
    <UiNavbar sticky>
      <div class="flex h-16 max-w-screen-2xl items-center justify-between px-5">
        <h1 class="text-lg font-semibold tracking-tight">Nuxt Unlayer</h1>
        <div v-if="editor" class="flex items-center gap-2">
          <UiButton variant="outline" size="sm" @click="exportHTML">Export HTML</UiButton>
          <UiButton variant="outline" @click="hiddenFile.click()">Import Design</UiButton>
          <UiButton class="btn" @click="saveDesign">Save Design</UiButton>
        </div>
      </div>
    </UiNavbar>
    <section class="h-[calc(100dvh-65px)]">
      <ClientOnly>
        <EmailEditor
          display-mode="email"
          :appearance="{
            theme: 'dark',
          }"
          @ready="editorLoaded"
        />
      </ClientOnly>
    </section>
  </main>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input ref="hiddenFile" type="file" hidden accept=".json" @change="importDesign" />
  <UiVueSonner />
</template>

<script setup lang="ts">
  import sample from "@@/sample.json";
  import type { EditorInstance } from "#unlayer/props";

  useHead({ title: "Nuxt - Unlayer" });
  const colorMode = useColorMode();

  const editor = shallowRef<EditorInstance | null | undefined>();
  const hiddenFile = ref();

  const editorLoaded = (value: any) => {
    console.log("🚀 ~ file: app.vue:23 ~ editorLoaded ~ value", value);
    editor.value = value;

    // load up design after the editor gets loaded
    editor.value?.loadDesign(JSON.parse(JSON.stringify(sample)));
    useSonner.success("Editor Loaded", {
      duration: 2000,
      description: "You can now start designing your email template",
    });
  };

  const saveDesign = () => {
    editor.value?.saveDesign((design: any) => {
      useSonner.success("Design Saved", {
        duration: 2000,
        description:
          "Your design has been saved successfully. CHeck the console for the design object",
      });
      console.log("🚀 ~ file: app.vue:31 ~ editor.value.saveDesign ~ design", design);
    });
  };

  const importDesign = (e: any) => {
    if (!e) return;
    const file = e.target.files[0];
    if (!file.type.includes("json")) return;
    const reader = new FileReader();

    reader.onload = function (readVal) {
      const result = readVal.target?.result;
      if (typeof result === "string") {
        editor.value?.loadDesign(JSON.parse(result));
        useSonner.success("Design Imported", {
          duration: 2000,
          description: "Your design has been imported successfully",
        });
      }
    };
    reader.readAsText(file);
  };
  const exportHTML = () => {
    editor.value?.exportHtml((data: any) => {
      const json = data.design; // design json
      console.log("🚀 ~ file: app.vue:40 ~ editor.value.exportHtml ~ json", json);
      const html = data.html; // final html
      console.log("🚀 ~ file: app.vue:42 ~ editor.value.exportHtml ~ html", html);
      useSonner.success("HTML Exported", {
        duration: 2000,
        description: "Your design has been exported successfully. Check the console for the HTML",
      });
    });
  };

  const title = "Nuxt Unlayer";
  const description = "Easily add unlayer to your Nuxt application";
  const image = "/image.jpg";
  const url = "https://nuxt-unlayer.behonbaker.com";
  useSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterTitle: title,
    ogUrl: url,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: "summary_large_image",
  });

  useHead({
    htmlAttrs: {
      lang: "en",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/UnlayerIcon.png",
      },
    ],
  });
</script>
