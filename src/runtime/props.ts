import type { UnlayerEditor, UnlayerOptions } from "@unlayer/types";

// Re-export the types most consumers will need so they only import from one place.
export type {
  AppearanceConfig,
  ColorPicker,
  DisplayMode,
  EditorSettings,
  Features,
  Fonts,
  LinkType,
  LinkTypeField,
  LinkTypeFieldOption,
  LinkTypes,
  LinkTypesSharedConfig,
  MergeTag,
  MergeTags,
  SpecialLink,
  SpecialLinks,
  Tabs,
  TextEditorCustomButton,
  ToolConfig,
  ToolsConfig,
  User,
  // Export/save result types
  ExportChunksResult,
  ExportFromApiResult,
  ExportHtmlOptions,
  ExportHtmlResult,
  ExportImageFromApiOptions,
  ExportPdfFromApiOptions,
  ExportPlainTextOptions,
  ExportPlainTextResult,
  ExportZipFromApiOptions,
  JSONTemplate,
  SaveDesignOptions,
} from "@unlayer/types";

/** Full configuration options accepted by the EmailEditor component. */
export type EditorProps = UnlayerOptions;

/** A reference to the Unlayer editor instance returned by `createEditor`. */
export type EditorInstance = UnlayerEditor;
