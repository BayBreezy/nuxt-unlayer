<template>
  <div v-bind="$attrs" :id="theId" style="height: 100%" />
</template>

<script setup lang="ts">
// UUID to create random ID for the editor
import { v4 as uuidv4 } from "uuid";
import { computed, onMounted } from "vue";
const emits = defineEmits(["load", "ready", "update:editor"]);
let theId = computed(() => uuidv4());

// Editor props with some defaults
const props = defineProps({
  editor: Object,
  projectId: Number,
  fonts: {
    type: Object,
    default: () => {
      // If this is not set to false, no fonts will show up in the list
      return { showDefaultFonts: false };
    },
  },
  defaultDevice: String,
  devices: Array,
  customCSS: [String, Array],
  customJS: [String, Array],
  specialLinks: Array,
  displayMode: { type: String, default: () => "email" },
  tools: Object,
  appearance: Object,
  locale: String,
  features: Object,
  tabs: Object,
  user: Object,
  mergeTags: Object,
  templateId: Number,
});

let editor: any = null;

onMounted(() => {
  // Create instance
  // @ts-ignore
  editor = window.unlayer.createEditor({
    ...props,
    id: theId.value, //theId.value,
  });
  // Add listener to send back the instance once teh editor is ready
  editor.addEventListener("editor:ready", () => {
    emits("update:editor", editor);
    emits("load", editor);
    emits("ready", editor);
  });
});
</script>
