---
title: Events & Reactivity
description: Vue emits exposed by the component and which props update the live editor reactively vs. which trigger a full re-initialisation.
navigation:
  icon: lucide:zap
---

## Events

`<EmailEditor>` exposes four Vue events.

### `@ready`

Fires once after `unlayer.createEditor()` completes. The payload is the live `EditorInstance` — hold onto it to call imperative methods like `saveDesign`, `exportHtml`, etc.

```vue
<EmailEditor @ready="onReady" />

<script setup lang="ts">
  import type { EditorInstance } from "#unlayer/props";

  const editor = shallowRef<EditorInstance>();
  const onReady = (instance: EditorInstance | undefined) => {
    editor.value = instance;
  };
</script>
```

::prose-callout{variant="warning" title="Use shallowRef"}
The `EditorInstance` object is large and deeply nested. Always store it in a `shallowRef` to avoid Vue's deep reactivity overhead.
::

### `@design:updated`

Fires every time the user modifies anything in the design — moves a block, changes a colour, edits text, etc. Useful for auto-save or dirty-state tracking.

```vue
<EmailEditor @design:updated="onChanged" />

<script setup lang="ts">
  const isDirty = ref(false);
  const onChanged = (data: { type: string }) => {
    isDirty.value = true;
    console.log("Change type:", data.type);
  };
</script>
```

### `@design:loaded`

Fires after a design has been fully loaded — either from `initialDesign`, `loadDesign()`, or `loadTemplate()`. Use it to know when the canvas is populated.

```vue
<EmailEditor @design:loaded="onLoaded" />

<script setup lang="ts">
  import type { JSONTemplate } from "#unlayer/props";

  const onLoaded = (data: { design: JSONTemplate }) => {
    console.log("Design loaded:", data.design);
  };
</script>
```

### `@image:uploaded`

Fires when the user uploads an image through the editor's image picker. Useful for logging or displaying recently used images.

```vue
<EmailEditor @image:uploaded="onUpload" />

<script setup lang="ts">
  const onUpload = (data: { image: { url: string; width?: number; height?: number } }) => {
    console.log("Uploaded:", data.image.url);
  };
</script>
```

---

## Prop reactivity

Not every prop change requires destroying and re-creating the editor. Where Unlayer provides a live setter method, the component calls it directly so the user's in-progress design is preserved.

### Reactive props (no re-init)

These props call the corresponding Unlayer setter and leave the canvas untouched:

| Prop | Unlayer method called |
|---|---|
| `appearance` | `setAppearance()` |
| `merge-tags` | `setMergeTags()` |
| `locale` | `setLocale()` |
| `text-direction` | `setTextDirection()` |
| `translations` | `setTranslations()` |
| `link-types` | `setLinkTypes()` |
| `link-types-shared-config` | `setLinkTypesSharedConfig()` |
| `display-conditions` | `setDisplayConditions()` |
| `special-links` | `setSpecialLinks()` |
| `design-tags-config` | `setDesignTagsConfig()` |
| `merge-tags-config` | `setMergeTagsConfig()` |
| `display-mode` | `setDisplayMode()` |
| `tabs` | `updateTabs()` |
| `user` | `loadUser()` |
| `validator` | `setValidator()` |
| `initial-design` | `loadDesign()` |

### Re-init props

The following props are passed to `unlayer.createEditor()` and cannot be updated on a live instance. Changing them destroys and recreates the editor — **the user's current design will be lost** unless you save it first via `saveDesign`.

`tools`, `exclude-tools`, `blocks`, `editor`, `fonts`, `safe-html`, `custom-css`, `custom-js`, `features`, `design-tags`, `project-id`

::prose-callout{variant="warning" title="Preserve designs across re-inits"}
If you need to change a re-init prop while the user is editing, save the design first:

```ts
editor.value?.saveDesign((design) => {
  savedDesign.value = design;
  // Now it's safe to change features / tools / fonts
  features.value = { ...features.value, audit: true };
});
```

After the editor reinitialises, pass `savedDesign` back via `:initial-design` to restore the canvas.
::

## Registering custom callbacks

For callbacks not covered by Vue emits — image upload handling, display conditions, merge tag pickers — register them directly on the `EditorInstance` returned by `@ready`:

```ts
const onReady = (instance: EditorInstance | undefined) => {
  editor.value = instance;

  // Custom image upload handler
  editor.value?.registerCallback("image", (file, done) => {
    uploadToMyStorage(file.accepted[0]).then((url) => {
      done({ progress: 100, url });
    });
  });

  // Display condition picker
  editor.value?.registerCallback("displayCondition", (data, done) => {
    openMyConditionPicker(data).then((result) => done(result));
  });
};
```
