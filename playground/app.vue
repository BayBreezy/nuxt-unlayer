<template>
  <main class="main">
    <header class="header">
      <h1>Nuxt Unlayer</h1>
      <div v-if="editor" class="nav">
        <button @click="exportHTML">Export HTML</button>
        <button @click="hiddenFile.click()">Import Design</button>
        <button @click="saveDesign" class="btn">Save Design</button>
      </div>
    </header>
    <section class="editor">
      <ClientOnly>
        <EmailEditor v-model:editor="editor" @load="editorLoaded" />
      </ClientOnly>
    </section>
  </main>
  <input
    @change="importDesign"
    type="file"
    hidden
    ref="hiddenFile"
    accept=".json"
  />
</template>

<script setup lang="ts">
import sample from "@/sample.json";

useHead({ title: "Nuxt - Unlayer" });

let editor = shallowRef();
let hiddenFile = ref();

const editorLoaded = () => {
  // load up design after the editor gets loaded
  editor.value.loadDesign(JSON.parse(JSON.stringify(sample)));
};

const saveDesign = () => {
  editor.value.saveDesign((design: any) => {
    console.log(
      "🚀 ~ file: app.vue:31 ~ editor.value.saveDesign ~ design",
      design
    );
  });
};

const importDesign = (e: any) => {
  if (!e) return;
  let file = e.target.files[0];
  if (!file.type.includes("json")) return;
  const reader = new FileReader();

  reader.onload = function (readVal) {
    editor.value.loadDesign(JSON.parse(readVal.target?.result));
  };
  reader.readAsText(file);
};
const exportHTML = () => {
  editor.value.exportHtml((data: any) => {
    var json = data.design; // design json
    console.log("🚀 ~ file: app.vue:40 ~ editor.value.exportHtml ~ json", json);
    var html = data.html; // final html
    console.log("🚀 ~ file: app.vue:42 ~ editor.value.exportHtml ~ html", html);
  });
};
</script>
