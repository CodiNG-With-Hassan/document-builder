import { CalloutStyle } from '@Core/models/widget-value.model';

export const CALLOUT_STYLES: readonly { style: CalloutStyle; labelKey: string; icon: string }[] = [
  { style: 'note', labelKey: 'BUILDER.WIDGETS.CALLOUT.STYLE_NOTE', icon: 'pi pi-info-circle' },
  { style: 'quote', labelKey: 'BUILDER.WIDGETS.CALLOUT.STYLE_QUOTE', icon: 'pi pi-comment' },
  { style: 'anecdote', labelKey: 'BUILDER.WIDGETS.CALLOUT.STYLE_ANECDOTE', icon: 'pi pi-book' },
];
