<template>
  <div :id="theId" style="height: 100%" />
</template>

<script setup lang="ts">
// UUID to create random ID for the editor
import { v4 as uuidv4 } from "uuid";
import { defu } from "defu";
import {
  onMounted,
  nextTick,
  shallowRef,
  toRef,
  watch,
  useState,
} from "#imports";
import type { EditorProps, EditorInstance } from "../props";
import type { ShallowRef } from "vue";
const theId = useState("editor-id", () => uuidv4());
const emits = defineEmits(["ready"]);

// Editor props with some defaults
const props = withDefaults(defineProps<EditorProps>(), {
  displayMode: "email",
  locale: "en-US",
});

const editorInstance: ShallowRef<EditorInstance | undefined> = shallowRef<
  EditorInstance | null | undefined
>();

declare global {
  interface Window {
    unlayer?: any;
  }
}

const loadEditor = async () => {
  const data = toRef(() => props);
  await nextTick();
  editorInstance.value = window?.unlayer?.createEditor({
    ...data.value,
    id: theId.value,
    fonts: defu({ showDefaultFonts: false }, data.value.fonts),
  });
  emits("ready", editorInstance.value);
};

onMounted(async () => {
  await nextTick();
  await loadEditor();
});

watch(
  () => props,
  async () => {
    await loadEditor();
  },
  { deep: true }
);
</script>
