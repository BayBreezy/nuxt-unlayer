<img src="/unlayer.png" style="height: 70px;"/>

# Nuxt Unlayer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Add the [Unlayer Editor](https://docs.unlayer.com/docs) to your [Nuxt](https://nuxt.com) app easily.

## Quick Setup

1. Add `nuxt-unlayer` dependency to your project

```bash
# Using yarn
yarn add --dev nuxt-unlayer

# Using npm
npm install --save-dev nuxt-unlayer
```

2. Add `nuxt-unlayer` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-unlayer"],
});
```

That's it! You can now use Nuxt Unlayer in your Nuxt app ✨

### Full Example

<details>
<summary>Full Example</summary>

```vue
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
```

</details>

## Screenshot of playground

<img src="/screenshot.png" style=""/>

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-unlayer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-unlayer
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-unlayer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-unlayer
[license-src]: https://img.shields.io/npm/l/nuxt-unlayer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-unlayer
