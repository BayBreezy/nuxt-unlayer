---
title: Configuration
description: All props accepted by the EmailEditor component — display mode, appearance, fonts, AI, merge tags, and more.
navigation:
  icon: lucide:settings
---

`<EmailEditor>` accepts every option from the [`Unlayer Config`](https://docs.unlayer.com/builder/appearance){target="_blank"} interface via props, plus the custom `initialDesign` prop. Types are available from `#unlayer/props`.

::prose-callout{variant="info" title="Paid Features"}
Some configuration options require an [Unlayer Paid](https://unlayer.com/pricing){target="_blank"} plan. 
::

## Display mode

```vue
// email (default), web, popup, or document
<EmailEditor display-mode="email" />
```

| Value | Description |
|-------|-------------|
| `email` | Responsive email builder — the default |
| `web` | Full-width web page builder |
| `popup` | Popup / overlay designer |
| `document` | Multi-page document builder |

## Appearance & theming

Control the editor's visual theme with the `appearance` prop:

```vue
<EmailEditor
  :appearance="{
    theme: 'modern_dark',
    panels: {
      tools: { dock: 'left' },
    },
  }"
/>
```

Available built-in themes: `classic_light`, `classic_dark`, `modern_light`, `modern_dark`.

You can also extend a theme to apply custom colours:

```ts
:appearance="{
  theme: {
    name: 'brand',
    extends: 'modern_light',
    isDark: false,
    mapping: {
      colors: {
        primary_01: '#6366f1', // map accent colours to your brand
      },
    },
  },
}"
```

## Fonts

Override the default font list and add custom Google or web fonts. User options always take precedence — the `showDefaultFonts: false` default only applies when you omit the `fonts` prop entirely.

```vue
<EmailEditor
  :fonts="{
    showDefaultFonts: false,
    customFonts: [
      {
        label: 'Inter',
        value: 'Inter, sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700',
      },
    ],
  }"
/>
```

## Locale

The editor ships with translations for 30+ locales. Pass a BCP 47 locale string — defaults to `en-US`.

```vue
<EmailEditor locale="fr" />
```

Supported built-in locales include: `ar`, `de`, `en`, `es`, `fr`, `it`, `ja`, `ko`, `pt-BR`, `ru`, `zh-CN`, `zh-TW`, and more.

The `locale` prop is reactive — changing it calls `setLocale` on the live editor without re-initialising.

## Text direction

For right-to-left languages set `text-direction="rtl"`:

```vue
<EmailEditor locale="ar" text-direction="rtl" />
```

## Merge tags

Pass dynamic content placeholders that users can insert into their designs:

```vue
<EmailEditor :merge-tags="mergeTags" />
```

```ts
const mergeTags = {
  first_name: { name: "First Name", value: "{{first_name}}", sample: "Jane" },
  last_name:  { name: "Last Name",  value: "{{last_name}}",  sample: "Doe"  },
  company: {
    name: "Company",
    mergeTags: {
      name: { name: "Company Name", value: "{{company.name}}", sample: "ACME" },
    },
  },
};
```

`mergeTags` is reactive — updating the ref calls `setMergeTags` without restarting the editor.

## Features

Enable or disable individual editor features:

```vue
<EmailEditor
  :features="{
    undoRedo: true,
    preview: true,
    stockImages: { enabled: true, safeSearch: true },
    textEditor: {
      fontSizes: ['12px', '14px', '16px', '18px', '24px', '32px'],
      spellChecker: true,
    },
  }"
/>
```

::prose-callout{variant="info" title="AI Copilot"}
Enable Unlayer's built-in AI assistant through the `features.ai` option. Requires an Unlayer Paid plan.

```ts
:features="{
  ai: {
    enabled: true,
    assistant: true,
    model: 'anthropic/claude-opus-4-8',
  },
}"
```
::

## Tools

Customise which content blocks are available and their order:

```vue
<EmailEditor
  :tools="{
    image:   { enabled: true,  position: 1 },
    button:  { enabled: true,  position: 2 },
    divider: { enabled: false },
  }"
/>
```

Use `exclude-tools` to remove specific tools by name without touching the rest:

```vue
<EmailEditor :exclude-tools="['video', 'timer']" />
```

`tools` and `exclude-tools` trigger a full editor re-initialisation when changed.

## Custom JS & CSS

Inject custom JavaScript or CSS into the editor iframe:

```vue
<EmailEditor
  :custom-js="['https://cdn.example.com/custom.js']"
  :custom-css="['.my-class { color: red; }']"
/>
```

Both props accept a string (single) or an array of strings (multiple). They require re-initialisation when changed.

## Loaded design

Pre-load a saved design at mount time:

```vue
<EmailEditor :initial-design="savedDesign" />
```

This prop is reactive — updating it calls `loadDesign` on the live editor. See the [Usage](/docs/usage) page for a complete example.

## Project ID

Associate the editor with an Unlayer project to enable user-saved blocks, templates, and other project-level features:

```vue
<EmailEditor :project-id="12345" />
```

## User

Pass the currently authenticated user to enable per-user saved blocks:

```vue
<EmailEditor
  :user="{
    id: '123',
    name: 'Jane Doe',
    email: 'jane@example.com',
  }"
/>
```

`user` is reactive — updating it calls `loadUser` on the live editor.

## Tabs

Customise or hide the sidebar panel tabs:

```vue
<EmailEditor
  :tabs="{
    body:    { enabled: true },
    content: { enabled: true },
    blocks:  { enabled: false },
  }"
/>
```

`tabs` is reactive — updating it calls `updateTabs` on the live editor.
