import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import documentCreatorPreset from '@Theme';
import { routes } from './app.routes';
import { DocumentRepository } from '@Core/repositories/document.repository';
import { InMemoryDocumentRepository } from '@Core/repositories/in-memory-document.repository';
import { ThemeSwitcher } from '@Core/services/theme-switcher';

export const SUPPORTED_LANGUAGES = ['en'] as const;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    // Unused for now: the app talks to the in-memory DocumentRepository below.
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      // Community/dev key, shared with de-autozaak.
      license:
        'eyJpZCI6IjdhZjY1ODgwLWRlMWQtNDdlOS05NjMwLTE2MzFlN2ZmMjg0MCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODUxNzc1MDksImV4cCI6MTgxNjcxMzUwOX0.grNfmglQeyCJz7eWM98_Oyk1KvJlJ9CXtUboQrKbwBGnNIafPJlFQex7IUT_oMKlLHi2yoNpBWikT9pXV343Ag',
      theme: {
        preset: documentCreatorPreset,
        options: {
          darkModeSelector: '.dark-mode',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, gridstack, tailwind-utilities',
          },
        },
      },
    }),
    provideTranslateService({
      loader: provideModuleTranslateLoader({
        modules: [
          { baseTranslateUrl: '/assets/i18n/shared' },
          { baseTranslateUrl: '/assets/i18n/documents' },
          { baseTranslateUrl: '/assets/i18n/builder' },
          { baseTranslateUrl: '/assets/i18n/errors' },
        ],
      }),
      fallbackLang: 'en',
    }),
    ConfirmationService,
    MessageService,
    { provide: DocumentRepository, useClass: InMemoryDocumentRepository },
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      inject(ThemeSwitcher).initialize();

      translate.addLangs([...SUPPORTED_LANGUAGES]);
      return firstValueFrom(translate.use('en'));
    }),
  ],
};
