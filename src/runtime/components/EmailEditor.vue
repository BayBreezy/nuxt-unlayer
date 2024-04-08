<template>
  <div :id="theId" style="height: 100%" />
</template>

<script lang="ts">
/// <reference path="../../../node_modules/unlayer-types/embed.d.ts" />

import Embed from "embed/index";
import { Editor as EditorClass } from "embed/Editor";
import { AppearanceConfig, DisplayMode, ToolsConfig } from "state/types/index";

export type Unlayer = typeof Embed;
export type UnlayerOptions = Parameters<Unlayer["createEditor"]>[0];
export type Editor = InstanceType<typeof EditorClass>;

export interface EditorRef {
  editor: Editor | null;
}

export interface EmailEditorProps {
  editorId?: string | undefined;
  minHeight?: number | string | undefined;
  onLoad?(unlayer: Editor): void;
  onReady?(unlayer: Editor): void;
  options?: UnlayerOptions | undefined;
  scriptUrl?: string | undefined;

  // redundant props -- already available in options
  /** @deprecated */
  appearance?: AppearanceConfig | undefined;
  /** @deprecated */
  displayMode?: DisplayMode;
  /** @deprecated */
  locale?: string | undefined;
  /** @deprecated */
  projectId?: number | undefined;
  /** @deprecated */
  tools?: ToolsConfig | undefined;
}

declare global {
  const unlayer: Unlayer;

  interface Window {
    __unlayer_lastEditorId: number;
    unlayer: Editor;
  }
}
</script>

<script setup lang="ts">
// UUID to create random ID for the editor
import { v4 as uuidv4 } from "uuid";
import { defu } from "defu";
import { computed, onMounted, nextTick, shallowRef, toRef, watch } from "vue";
const emits = defineEmits(["load", "ready", "update:editor"]);
const theId = computed(() => uuidv4());

// Editor props with some defaults
const props = withDefaults(defineProps<EmailEditorProps>(), {
  options(props) {
    return {
      fonts: {
        showDefaultFonts: false,
      },
    };
  },
});

let editorInstance = shallowRef<Editor | null>(null);

const loadEditor = async () => {
  if (window.unlayer) return;
  const data = toRef(() => props);
  await nextTick();
  editorInstance.value = window?.unlayer?.createEditor({
    ...data.value.options,
    id: theId.value,
    fonts: defu({ showDefaultsFonts: true }, data.value.options?.fonts),
  });
  emits("ready", editorInstance.value);
};

onMounted(async () => {
  await nextTick();
  await loadEditor();
  // Add listener to send back the instance once teh editor is ready
  editorInstance.addEventListener("editor:ready", () => {
    emits("update:editor", editorInstance.value);
    emits("load", editorInstance.value);
    emits("ready", editorInstance.value);
  });
});

watch(
  () => props,
  async () => {
    await loadEditor();
  }
);
</script>
