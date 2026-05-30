<template>
  <div class="flex h-dvh flex-col">
    <UiNavbar sticky>
      <div class="flex h-16 max-w-screen-2xl items-center justify-between px-5">
        <h1 class="text-lg font-semibold tracking-tight">Nuxt Unlayer</h1>
        <div v-if="editor" class="flex items-center gap-2">
          <UiButton size="sm" class="text-xs" variant="outline" @click="exportHTML"
            >Export HTML</UiButton
          >
          <UiButton class="text-xs" size="sm" variant="outline" @click="hiddenFile?.click()"
            >Import Design</UiButton
          >
          <UiButton class="text-xs" size="sm" @click="saveDesign">Save Design</UiButton>
          <div class="h-5 border-l" />
          <UiButton class="text-xs" size="sm" variant="outline" to="/docs/getting-started">
            <Icon name="lucide:book-open-text" />
            Docs</UiButton
          >
        </div>
      </div>
    </UiNavbar>

    <section class="flex-1 overflow-hidden">
      <EmailEditor
        display-mode="email"
        :appearance="{ theme: 'dark' }"
        :initial-design="initialDesign"
        @ready="onReady"
        @design:updated="onDesignUpdated"
      />
    </section>

    <input ref="hiddenFile" type="file" hidden accept=".json" @change="importDesign" />
  </div>
</template>

<script setup lang="ts">
  import type { EditorInstance, JSONTemplate } from "#unlayer/props";

  const props = defineProps<{
    /** Pre-load a design JSON when the editor mounts. */
    initialDesign?: JSONTemplate;
  }>();

  const emit = defineEmits<{
    /** Forwarded from the editor's @ready event. */
    ready: [editor: EditorInstance | undefined];
    /** Forwarded from the editor's @design:updated event. */
    "design:updated": [
      data: { type: string; item?: Record<string, any>; changes?: Record<string, any> },
    ];
  }>();

  const editor = shallowRef<EditorInstance | null | undefined>();
  const hiddenFile = useTemplateRef("hiddenFile");

  const onReady = (value: EditorInstance | undefined) => {
    editor.value = value;
    emit("ready", value);
    useSonner.success("Editor Loaded", {
      duration: 2000,
      description: "You can now start designing your email template",
    });
  };

  const onDesignUpdated = (data: any) => {
    emit("design:updated", data);
  };

  const saveDesign = () => {
    editor.value?.saveDesign((design: any) => {
      console.log("Saved design:", design);
      useSonner.success("Design Saved", {
        duration: 2000,
        description: "Check the console for the design JSON.",
      });
    });
  };

  const importDesign = (e: any) => {
    if (!e) return;
    const file = e.target.files[0];
    if (!file?.type.includes("json")) return;
    const reader = new FileReader();
    reader.onload = (readVal) => {
      const result = readVal.target?.result;
      if (typeof result === "string") {
        editor.value?.loadDesign(JSON.parse(result));
        useSonner.success("Design Imported", {
          duration: 2000,
          description: "Your design has been imported successfully.",
        });
      }
    };
    reader.readAsText(file);
  };

  const exportHTML = () => {
    editor.value?.exportHtml((data: any) => {
      console.log("Design JSON:", data.design);
      console.log("HTML:", data.html);
      useSonner.success("HTML Exported", {
        duration: 2000,
        description: "Check the console for the exported HTML.",
      });
    });
  };
</script>
