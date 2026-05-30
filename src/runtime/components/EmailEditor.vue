<template>
  <div :id="theId" style="height: 100%" />
</template>

<script setup lang="ts">
  import type { JSONTemplate } from "@unlayer/types";
  import { defu } from "defu";
  import { v4 as uuidv4 } from "uuid";
  import type { ShallowRef } from "vue";

  import { onMounted, onUnmounted, nextTick, shallowRef, watch, useState } from "#imports";

  import type { EditorProps, EditorInstance } from "../props";

  /**
   * All standard Unlayer config options plus `initialDesign`, which loads a saved design into the
   * editor after initialisation and whenever it changes.
   */
  type ComponentProps = EditorProps & {
    initialDesign?: JSONTemplate;
  };

  const theId = useState("editor-id", () => uuidv4());

  const emits = defineEmits<{
    /** Fires once the editor instance is created and ready to use. */
    ready: [editor: EditorInstance | undefined];
    /** Fires whenever the user modifies the design. */
    "design:updated": [
      data: { type: string; item?: Record<string, any>; changes?: Record<string, any> },
    ];
    /** Fires after a design is loaded via `loadDesign` (including `initialDesign`). */
    "design:loaded": [data: { design: JSONTemplate }];
    /** Fires when the user uploads an image. */
    "image:uploaded": [data: { image: { url: string; width?: number; height?: number } }];
  }>();

  const props = withDefaults(defineProps<ComponentProps>(), {
    displayMode: "email",
    locale: "en-US",
  });

  const editorInstance: ShallowRef<EditorInstance | undefined> = shallowRef<
    EditorInstance | undefined
  >();

  declare global {
    interface Window {
      unlayer?: any;
    }
  }

  const registerEvents = (editor: EditorInstance) => {
    editor.addEventListener("design:updated", (data: any) => emits("design:updated", data));
    editor.addEventListener("design:loaded", (data: any) => emits("design:loaded", data));
    editor.addEventListener("image:uploaded", (data: any) => emits("image:uploaded", data));
  };

  /**
   * Full re-initialisation — destroys and recreates the editor. Only called for props that Unlayer
   * does not support updating live (tools, fonts, features, etc.).
   */
  const loadEditor = async () => {
    await nextTick();
    editorInstance.value?.destroy();
    editorInstance.value = window?.unlayer?.createEditor({
      ...props,
      id: theId.value,
      fonts: defu(props.fonts, { showDefaultFonts: false }),
    });
    if (editorInstance.value) {
      registerEvents(editorInstance.value);
      if (props.initialDesign) {
        editorInstance.value.loadDesign(props.initialDesign);
      }
    }
    emits("ready", editorInstance.value);
  };

  onMounted(async () => {
    await nextTick();
    await loadEditor();
  });

  onUnmounted(() => {
    editorInstance.value?.destroy();
  });

  // ─── Props requiring full re-init ────────────────────────────────────────────

  watch(
    () => [
      props.tools,
      props.excludeTools,
      props.blocks,
      props.editor,
      props.fonts,
      props.safeHtml,
      props.customCSS,
      props.customJS,
      props.features,
      props.designTags,
      props.projectId,
    ],
    async () => {
      await loadEditor();
    },
    { deep: true },
  );

  // ─── Props with dedicated setter methods (no re-init needed) ─────────────────

  watch(
    () => props.mergeTags,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setMergeTags(value);
    },
    { deep: true },
  );

  watch(
    () => props.appearance,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setAppearance(value);
    },
    { deep: true },
  );

  watch(
    () => props.locale,
    (value) => {
      editorInstance.value?.setLocale(value ?? null);
    },
  );

  watch(
    () => props.textDirection,
    (value) => {
      editorInstance.value?.setTextDirection(value ?? null);
    },
  );

  watch(
    () => props.translations,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setTranslations(value);
    },
    { deep: true },
  );

  watch(
    () => props.linkTypes,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setLinkTypes(value);
    },
    { deep: true },
  );

  watch(
    () => props.linkTypesSharedConfig,
    (value) => {
      editorInstance.value?.setLinkTypesSharedConfig(value ?? null);
    },
    { deep: true },
  );

  watch(
    () => props.displayConditions,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setDisplayConditions(value);
    },
    { deep: true },
  );

  watch(
    () => props.specialLinks,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setSpecialLinks(Object.values(value));
    },
    { deep: true },
  );

  watch(
    () => props.designTagsConfig,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setDesignTagsConfig(value);
    },
    { deep: true },
  );

  watch(
    () => props.mergeTagsConfig,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setMergeTagsConfig(value);
    },
    { deep: true },
  );

  watch(
    () => props.displayMode,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.setDisplayMode(value);
    },
  );

  watch(
    () => props.tabs,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.updateTabs(value);
    },
    { deep: true },
  );

  watch(
    () => props.user,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.loadUser(value);
    },
    { deep: true },
  );

  watch(
    () => props.validator,
    (value) => {
      // Cast required: Config.validator and setValidator's Validator type have
      // incompatible (but functionally equivalent) signatures in @unlayer/types.
      editorInstance.value?.setValidator((value as any) ?? null);
    },
  );

  watch(
    () => props.initialDesign,
    (value) => {
      if (!editorInstance.value || value === undefined) return;
      editorInstance.value.loadDesign(value);
    },
  );
</script>
