import { Type } from '@angular/core';
import { WidgetType } from '@Core/models/widget-type.enum';
import { WidgetValue } from '@Core/models/widget-value.model';
import { CalloutWidget } from './callout-widget/callout-widget';
import { CalloutWidgetForm } from './callout-widget/callout-widget-form';
import { HeaderWidget } from './header-widget/header-widget';
import { HeaderWidgetForm } from './header-widget/header-widget-form';
import { ImageWidget } from './image-widget/image-widget';
import { ImageWidgetForm } from './image-widget/image-widget-form';
import { LinkWidget } from './link-widget/link-widget';
import { LinkWidgetForm } from './link-widget/link-widget-form';
import { ProcessWidget } from './process-widget/process-widget';
import { ProcessWidgetForm } from './process-widget/process-widget-form';
import { TableWidget } from './table-widget/table-widget';
import { TableWidgetForm } from './table-widget/table-widget-form';
import { TextWidget } from './text-widget/text-widget';
import { TextWidgetForm } from './text-widget/text-widget-form';
import { TocWidget } from './toc-widget/toc-widget';
import { TocWidgetForm } from './toc-widget/toc-widget-form';
import { VideoWidget } from './video-widget/video-widget';
import { VideoWidgetForm } from './video-widget/video-widget-form';

interface GridSize {
  w: number;
  h: number;
}

/**
 * - free: the user sizes the Widget; its content scrolls inside.
 * - content: Content height — the height follows the content, only the width can be resized.
 */
export type WidgetSizing = 'free' | 'content';

/**
 * Everything the builder knows about one Widget type. Adding a type means adding an entry here
 * plus its own folder; nothing else switches on WidgetType. View and form follow
 * widget-contract.ts.
 */
export interface WidgetTypeDefinition<T extends WidgetType = WidgetType> {
  type: T;
  /** i18n key of the palette and sidebar label. */
  labelKey: string;
  /** primeicons class. */
  icon: string;
  defaultValue: () => WidgetValue<T>;
  defaultSize: GridSize;
  /** Applied to the grid on load; never persisted. */
  minSize: GridSize;
  sizing: WidgetSizing;
  /** At most this many per Document (e.g. one Table of contents). */
  maxPerDocument?: number;
  view: Type<unknown>;
  form: Type<unknown>;
}

const emptyLink = () => ({ label: '', url: '' });
const emptyCell = () => ({ kind: 'text' as const, text: '' });

export const WIDGET_REGISTRY: { readonly [T in WidgetType]: WidgetTypeDefinition<T> } = {
  [WidgetType.Header]: {
    type: WidgetType.Header,
    labelKey: 'BUILDER.WIDGETS.HEADER.LABEL',
    icon: 'pi pi-heading',
    defaultValue: () => ({ content: { text: '' }, config: { level: 1, numbered: true } }),
    defaultSize: { w: 6, h: 6 },
    minSize: { w: 1, h: 1 },
    sizing: 'free',
    view: HeaderWidget,
    form: HeaderWidgetForm,
  },
  [WidgetType.Text]: {
    type: WidgetType.Text,
    labelKey: 'BUILDER.WIDGETS.TEXT.LABEL',
    icon: 'pi pi-align-left',
    defaultValue: () => ({ content: { html: '' } }),
    defaultSize: { w: 6, h: 6 },
    minSize: { w: 1, h: 1 },
    sizing: 'free',
    view: TextWidget,
    form: TextWidgetForm,
  },
  [WidgetType.TableOfContents]: {
    type: WidgetType.TableOfContents,
    labelKey: 'BUILDER.WIDGETS.TOC.LABEL',
    icon: 'pi pi-list',
    defaultValue: () => ({ content: { title: 'Contents' }, config: { depth: 3 } }),
    defaultSize: { w: 12, h: 8 },
    minSize: { w: 2, h: 1 },
    sizing: 'content',
    maxPerDocument: 1,
    view: TocWidget,
    form: TocWidgetForm,
  },
  [WidgetType.Table]: {
    type: WidgetType.Table,
    labelKey: 'BUILDER.WIDGETS.TABLE.LABEL',
    icon: 'pi pi-table',
    defaultValue: () => ({
      content: {
        caption: '',
        rows: Array.from({ length: 3 }, () => Array.from({ length: 3 }, emptyCell)),
      },
      config: { headerRow: true, headerColumn: false, striped: false, columnWidths: null },
    }),
    defaultSize: { w: 12, h: 8 },
    minSize: { w: 3, h: 1 },
    sizing: 'content',
    view: TableWidget,
    form: TableWidgetForm,
  },
  [WidgetType.Image]: {
    type: WidgetType.Image,
    labelKey: 'BUILDER.WIDGETS.IMAGE.LABEL',
    icon: 'pi pi-image',
    defaultValue: () => ({
      content: { src: '', caption: '', href: '' },
      config: { fit: 'contain' },
    }),
    defaultSize: { w: 6, h: 10 },
    minSize: { w: 1, h: 2 },
    sizing: 'free',
    view: ImageWidget,
    form: ImageWidgetForm,
  },
  [WidgetType.Callout]: {
    type: WidgetType.Callout,
    labelKey: 'BUILDER.WIDGETS.CALLOUT.LABEL',
    icon: 'pi pi-comment',
    defaultValue: () => ({
      content: { title: '', html: '', source: '' },
      config: { style: 'note' },
    }),
    defaultSize: { w: 12, h: 6 },
    minSize: { w: 2, h: 1 },
    sizing: 'content',
    view: CalloutWidget,
    form: CalloutWidgetForm,
  },
  [WidgetType.Process]: {
    type: WidgetType.Process,
    labelKey: 'BUILDER.WIDGETS.PROCESS.LABEL',
    icon: 'pi pi-sort-numeric-down',
    defaultValue: () => ({
      content: {
        steps: [
          { id: crypto.randomUUID(), title: '', html: '' },
          { id: crypto.randomUUID(), title: '', html: '' },
        ],
      },
    }),
    defaultSize: { w: 12, h: 8 },
    minSize: { w: 3, h: 1 },
    sizing: 'content',
    view: ProcessWidget,
    form: ProcessWidgetForm,
  },
  [WidgetType.Link]: {
    type: WidgetType.Link,
    labelKey: 'BUILDER.WIDGETS.LINK.LABEL',
    icon: 'pi pi-link',
    defaultValue: () => ({ content: { link: emptyLink(), description: '' } }),
    defaultSize: { w: 4, h: 5 },
    minSize: { w: 2, h: 1 },
    sizing: 'content',
    view: LinkWidget,
    form: LinkWidgetForm,
  },
  [WidgetType.Video]: {
    type: WidgetType.Video,
    labelKey: 'BUILDER.WIDGETS.VIDEO.LABEL',
    icon: 'pi pi-video',
    defaultValue: () => ({ content: { url: '' } }),
    defaultSize: { w: 6, h: 14 },
    minSize: { w: 2, h: 1 },
    sizing: 'content',
    view: VideoWidget,
    form: VideoWidgetForm,
  },
};

export const WIDGET_TYPES: readonly WidgetTypeDefinition[] = Object.values(WIDGET_REGISTRY);
