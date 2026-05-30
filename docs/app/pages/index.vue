<template>
  <EmailEditorDemo :initial-design="sample" />
  <UiSonner />
</template>

<script setup lang="ts">
  import sample from "@@/sample.json";

  definePageMeta({ layout: "default" });

  useSeoMeta({
    title: "Nuxt Unlayer — Live Demo",
    description: "Drag-and-drop email builder for Nuxt, powered by Unlayer.",
    ogTitle: "Nuxt Unlayer",
    ogDescription: "Drag-and-drop email builder for Nuxt, powered by Unlayer.",
    ogImage: "/image.jpg",
    twitterCard: "summary_large_image",
  });
</script>
