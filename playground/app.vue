<template>
  <main class="main">
    <header class="header">
      <h1>Nuxt Unlayer</h1>
      <div v-if="editor" class="nav">
        <button @click="exportHTML">Export HTML</button>
        <button @click="hiddenFile.click()">Import Design</button>
        <button class="btn" @click="saveDesign">Save Design</button>
      </div>
    </header>
    <section class="editor">
      <ClientOnly>
        <EmailEditor @ready="editorLoaded" />
      </ClientOnly>
    </section>
  </main>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input
    ref="hiddenFile"
    type="file"
    hidden
    accept=".json"
    @change="importDesign"
  />
</template>

<script setup lang="ts">
import { useHead, shallowRef, ref } from "#imports";
import sample from "@/sample.json";
import type { EditorInstance } from "#unlayer/props";

useHead({ title: "Nuxt - Unlayer" });

const editor = shallowRef<EditorInstance | null | undefined>();
const hiddenFile = ref();

const editorLoaded = (value: any) => {
  console.log("🚀 ~ file: app.vue:23 ~ editorLoaded ~ value", value);
  editor.value = value;

  // load up design after the editor gets loaded
  editor.value?.loadDesign(JSON.parse(JSON.stringify(sample)));
};

const saveDesign = () => {
  editor.value?.saveDesign((design: any) => {
    console.log(
      "🚀 ~ file: app.vue:31 ~ editor.value.saveDesign ~ design",
      design
    );
  });
};

const importDesign = (e: any) => {
  if (!e) return;
  const file = e.target.files[0];
  if (!file.type.includes("json")) return;
  const reader = new FileReader();

  reader.onload = function (readVal) {
    editor.value?.loadDesign(JSON.parse(readVal.target?.result));
  };
  reader.readAsText(file);
};
const exportHTML = () => {
  editor.value?.exportHtml((data: any) => {
    const json = data.design; // design json
    console.log("🚀 ~ file: app.vue:40 ~ editor.value.exportHtml ~ json", json);
    const html = data.html; // final html
    console.log("🚀 ~ file: app.vue:42 ~ editor.value.exportHtml ~ html", html);
  });
};
</script>
