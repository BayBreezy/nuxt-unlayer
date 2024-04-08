<template>
  <div :id="theId" style="height: 100%" />
</template>

<script lang="ts">
export type ThemeColor = "light" | "dark";
export type DockPosition = "right" | "left";
export interface AppearanceConfig {
  readonly theme?: ThemeColor | undefined;
  readonly panels?:
    | {
        readonly tools?:
          | {
              readonly dock: DockPosition;
            }
          | undefined;
      }
    | undefined;
}
export interface User {
  readonly id?: number | undefined;
  readonly name?: string | undefined;
  readonly email?: string | undefined;
}

export interface GroupedMergeTag {
  readonly name: string;
  readonly mergeTags: Array<SimpleMergeTag | GroupedMergeTag>;
}

export interface SimpleMergeTag {
  readonly name: string;
  readonly value: string;
  readonly sample?: string;
}

export interface ConditionalMergeTagRule {
  readonly name: string;
  readonly before: string;
  readonly after: string;
}

export interface ConditionalMergeTag {
  readonly name: string;
  readonly rules: ConditionalMergeTagRule[];
  readonly mergeTags?: SimpleMergeTag[] | undefined;
}

export type MergeTag = SimpleMergeTag | ConditionalMergeTag | GroupedMergeTag;
interface StringList {
  [key: string]: string;
}
</script>

<script setup lang="ts">
// UUID to create random ID for the editor
import { v4 as uuidv4 } from "uuid";
import { defu } from "defu";
import {
  computed,
  onMounted,
  nextTick,
  shallowRef,
  toRef,
  watch,
  useState,
} from "#imports";
const emits = defineEmits(["load", "ready", "update:editor"]);
import type { UnlayerOptions } from "../props";
const theId = useState("editor-id", () => uuidv4());

// Editor props with some defaults
const props = defineProps<UnlayerOptions>();

let editorInstance = shallowRef();

const loadEditor = async () => {
  const data = toRef(() => props);
  await nextTick();
  editorInstance.value = window?.unlayer?.createEditor({
    ...data.value,
    id: theId.value,
  });
  // Add listener to send back the instance once teh editor is ready
  editorInstance.value?.addEventListener("editor:ready", () => {
    emits("update:editor", editorInstance.value);
    emits("load", editorInstance.value);
    emits("ready", editorInstance.value);
  });
};

onMounted(async () => {
  await nextTick();
  await loadEditor();
});

watch(
  () => props,
  async () => {
    await loadEditor();
  }
);
</script>
