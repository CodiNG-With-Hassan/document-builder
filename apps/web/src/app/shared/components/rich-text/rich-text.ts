import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

/**
 * Renders Rich text. `[innerHTML]` goes through Angular's sanitizer. Links open in a new tab in
 * Preview; in Edit mode they don't navigate (a click selects the Widget instead), and Links
 * without a URL are marked as incomplete.
 */
@Component({
  selector: 'app-rich-text',
  template: '<div class="rich-text" [innerHTML]="html()"></div>',
  styleUrl: './rich-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The HTML comes in through [innerHTML], which emulated encapsulation cannot reach.
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-rich-text',
    '[class.rich-text--edit]': 'editMode()',
    '(click)': 'onClick($event)',
  },
})
export class RichText {
  readonly html = input.required<string>();
  readonly editMode = input(false);

  protected onClick(event: MouseEvent): void {
    const anchor = (event.target as Element | null)?.closest('a');
    if (!anchor) return;
    event.preventDefault();
    const href = anchor.getAttribute('href');
    if (!this.editMode() && href) window.open(href, '_blank', 'noopener');
  }
}
