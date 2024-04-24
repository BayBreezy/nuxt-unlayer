export type DisplayMode = "email" | "web" | "popup";
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

interface StringList {
  [key: string]: string;
}
export interface Design {
  readonly body: Record<string, any>;
  readonly counters: Record<string, any>;
  readonly schemaVersion?: number;
}

export interface FileInfo {
  readonly accepted: File[];
  readonly attachments: File[];
}

export interface FileUploadDoneData {
  readonly progress: number;
  readonly url?: string | undefined;
}

export interface ImageExport {
  readonly url: string;
  readonly design: Design;
}

export interface ImageExportOptions {
  readonly fullPage?: boolean;
  readonly mergeTags?: MergeTag;
}

export interface ZipExport {
  readonly url: string;
  readonly design: Design;
}

export interface ZipExportOptions {
  readonly mergeTags?: MergeTag;
}
export interface PDFExport {
  /** This is the URL of the generated PDF */
  readonly url: string;
  readonly design: Design;
}
export interface PDFExportOptions {
  readonly mergeTags?: MergeTag;
}

export interface HTMLExport {
  readonly html: string;
  readonly design: Design;
  readonly chunks?: Record<string, string> | undefined;
  readonly amp?: Record<string, any> | undefined;
}

export interface PlainTextExport {
  /** This is the full plain text of the design */
  readonly text: string;
  /** This is the JSON of the design */
  readonly design: Design;
}

export interface PLainTextExportOptions {
  /** Links and buttons will not be included */
  readonly ignoreLinks?: boolean;
  /** Image alt text will not be included */
  readonly ignoreImages?: boolean;
  /** Pre-header text for emails will not be included. */
  readonly ignorePreheader?: boolean;
  /**
   * If you want the Merge Tags in your design to be replaced by different values, you can pass the mergeTags object to export options.
   */
  readonly mergeTags?: MergeTag;
}

export interface HtmlOptions {
  readonly cleanup?: boolean;
  readonly minify?: boolean;
  readonly mergeTags?: MergeTag;
}

export interface User {
  readonly id?: number | undefined;
  readonly name?: string | undefined;
  readonly email?: string | undefined;
  [key: string]: any;
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

export interface GroupedSpecialLink {
  readonly name: string;
  readonly specialLinks: Array<SimpleSpecialLink | GroupedSpecialLink>;
}

export interface SimpleSpecialLink {
  readonly name: string;
  readonly href: string;
  readonly target: string;
}

export type SpecialLink = SimpleSpecialLink | GroupedSpecialLink;
export interface ToolPropertiesConfig {
  readonly [key: string]: { value: string };
}

export interface ToolConfig {
  readonly enabled?: boolean | undefined;
  readonly position?: number | undefined;
  readonly properties?: ToolPropertiesConfig | StringList | undefined;
}

export interface ToolsConfig {
  readonly [key: string]: ToolConfig;
}

export interface EditorConfig {
  readonly minRows?: number | undefined;
  readonly maxRows?: number | undefined;
  readonly autoSelectOnDrop?: boolean | undefined;
  readonly confirmOnDelete?: boolean | undefined;
}

export interface Font {
  defaultFont?: boolean;
  type?: "google" | string;
  label: string;
  value: string;
  url?: string;
  weights?: number[];
}
export type FontList = Font[];
export interface FontConfig {
  showDefaultFonts?: boolean;
  customFonts?: FontList;
}

export interface ColorPicker {
  readonly presets?: string[];
}

export interface CustomButton {
  name: string;
  text: string;
  icon: string;
  onSetup: () => {};
  onAction: (data: any, callback: Function) => void;
}

export interface TextEditor {
  readonly fontSizes?: string[];
  readonly spellChecker?: boolean;
  readonly tables?: boolean;
  readonly cleanPaste?: boolean | "confirm" | "basic" | string;
  readonly emojis?: boolean;
  readonly inlineFontControls?: boolean;
  /**
   * @example
   * 
   * features: {
      textEditor: {
        customButtons: [
          {
            name: 'my_button',
            text: 'My Button',
            icon: 'bookmark',
            onSetup: () => {},
            onAction: (data, callback) => {
              console.log(data.text);
              callback(data.text + ' Updated');
            },
          },
        ],
      },
    },
   */
  readonly customButtons?: CustomButton[];
}

export interface ImageEditor {
  enabled?: boolean;
  tools?: {
    resize?: boolean;
  };
}

export interface StockImage {
  enabled?: boolean;
  safeSearch?: boolean;
  defaultSearchTerm?: string;
}

export interface Feature {
  preview?: boolean;
  userUploads?: boolean;
  audit?: boolean;
  pageAnchors?: boolean;
  undoRedo?: boolean;
  stockImages?: StockImage;
  textEditor?: TextEditor;
  preheaderText?: boolean;
  smartMergeTags?: boolean;
  svgImageUpload?: boolean;
  sendTestEmail?: boolean;
  colorPicker?: ColorPicker;
}

export type EditorProps = {
  displayMode?: DisplayMode;
  projectId?: number | null;
  locale?: string;
  appearance?: AppearanceConfig;
  user?: User;
  mergeTags?: MergeTag[];
  designTags?: Record<string, any>;
  specialLinks?: SpecialLink[];
  tools?: ToolsConfig;
  blocks?: Array<Record<string, any>>;
  editor?: EditorConfig;
  fonts?: FontConfig;
  safeHtml?: boolean;
  customJS?: string[];
  customCSS?: string[];
  textDirection?: "ltr" | "rtl";
  features?: Feature;
};

export type LinkTypeFieldOption = {
  value: string;
  label: string;
  enabled?: boolean;
};
export interface LinkTypeField {
  name: string;
  label: string;
  defaultValue?: string | LinkTypeFieldOption[] | undefined;
  enabled?: boolean;
  placeholderText?: string;
  inputType?: any;
  isClearable?: boolean;
  isCreatable?: boolean;
  isMulti?: boolean;
  limit?: number;
  limitMessage?: string;
  validationRegex?: string;
  options?: LinkTypeFieldOption[];
  onCreateOption?: (
    inputValue: string,
    meta: object,
    done: (newOption: LinkTypeFieldOption) => void
  ) => void;
}
export interface LinkType {
  name: string;
  label: string;
  enabled?: boolean;
  attrs?: {
    href?: string;
    target?: string;
    onClick?: string | Function;
    class?: string;
    [key: string]: any;
  };
  fields?: LinkTypeField[];
}
export type LinkTypes = LinkType[];
export type LinkTypesSharedConfig = Pick<LinkType, "attrs" | "fields">;

export type EditorInstance = {
  frame?: Record<string, any> | null;
  init(config?: Record<string, any>): void;
  destroy(): void;
  version: string | undefined;
  loadEditor(config: Record<string, any>): void;
  renderEditor(config: Record<string, any>): void;
  initEditor(config: Record<string, any>): void;
  /**
   * We have a few pre-built blocks available with different column sizes. You can add your own blocks with custom column sizes. Each block can have up to 12 columns.
   *
   * @param cells An array of column numbers that you want to register as cells.
   */
  registerColumns(cells: number[]): void;
  registerCallback(type: string, callback: Function): void;
  registerCallback(
    type: "image",
    callback: (file: FileInfo, done: (data: FileUploadDoneData) => void) => void
  ): void;
  unregisterCallback(type: string): void;
  registerProvider(type: string, callback: Function): void;
  unregisterProvider(type: string): void;
  reloadProvider(type: string): void;
  addEventListener(type: string, callback: Function): void;
  removeEventListener(type: string): void;
  setDesignId(id: string | null): void;
  setDesignMode(designMode: string): void;
  setDisplayMode(displayMode: DisplayMode): void;
  loadProject(projectId: number): void;
  loadUser(user: User): void;
  loadTemplate(templateId: number): void;
  loadStockTemplate(stockTemplateId: string): void;
  setLinkTypes(linkTypes: LinkTypes): void;
  setLinkTypesSharedConfig(
    linkTypesSharedConfig: LinkTypesSharedConfig | null
  ): void;
  setMergeTags(mergeTags: MergeTag): void;
  setSpecialLinks(specialLinks: SpecialLink[]): void;
  setDisplayConditions(displayConditions: any): void;
  setLocale(locale: string | null): void;
  setTextDirection(textDirection: "rtl" | "ltr" | null): void;
  setTranslations(translations: any): void;
  /**
   * The editor loads with a blank design by default. You can use this function to reset the design to blank state and let the user can start from scratch.
   *
   * You can also specify a background color for the body here.
   *
   * @param bodyValues default values that should be set after loading the blank design
   */
  loadBlank(bodyValues?: object): void;
  loadDesign(design: Design): void;
  saveDesign(callback: (data: Design) => void, options?: any): void;
  exportHtml(callback: (data: HTMLExport) => void, options?: HtmlOptions): void;
  exportLiveHtml(callback: (data: any) => void, options?: any): void;
  exportPlainText(
    callback: (data: PlainTextExport) => void,
    options?: PLainTextExportOptions
  ): void;
  exportImage(
    callback: (data: ImageExport) => void,
    options?: ImageExportOptions
  ): void;
  exportPdf(
    callback: (data: PDFExport) => void,
    options?: PDFExportOptions
  ): void;
  exportZip(
    callback: (data: ZipExport) => void,
    options?: ZipExportOptions
  ): void;
  setAppearance(appearance: Partial<AppearanceConfig>): void;
  /**
   * You can programmatically set values for the Body panel options.
   *
   * @param bodyValues default values that should be set after loading the blank design
   */
  setBodyValues(bodyValues: any, bodyId?: number): void;
  setDesignTagsConfig(designTagsConfig: any): void;
  setMergeTagsConfig(mergeTagsConfig: any): void;
  showPreview(payload: { device?: any; resolution?: number }): void;
  hidePreview(): void;
  canUndo(callback: (result: boolean) => void): void;
  canRedo(callback: (result: boolean) => void): void;
  undo(): void;
  redo(): void;
  audit(
    callback: (data: { status: "FAIL" | "PASS"; errors: any[] }) => void
  ): void;
  setValidator(validator: any | null): void;
  setToolValidator(tool: string, validator: any | null): void;
  updateTabs(tabs: any): void;
  clearValidators(): void;
  registerContainerExporter(): void;
  registerItemExporter(): void;
  registerTool(): void;
  registerPropertyEditor(): void;
  registerTab(): void;
  createPanel(): void;
  createViewer(): void;
  createWidget(): void;
};
