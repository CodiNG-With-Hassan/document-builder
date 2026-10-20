import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme';
const DARK_MODE_CLASS = 'dark-mode';

/** Light/dark mode: a `.dark-mode` class on <html> (PrimeNG and Tailwind both key off it). */
@Injectable({ providedIn: 'root' })
export class ThemeSwitcher {
  private readonly document = inject(DOCUMENT);

  readonly isDarkMode = signal(false);

  initialize(): void {
    this.apply(localStorage.getItem(STORAGE_KEY) === 'dark');
  }

  toggle(): void {
    const isDark = !this.isDarkMode();
    this.apply(isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  private apply(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.document.documentElement.classList.toggle(DARK_MODE_CLASS, isDark);
  }
}
