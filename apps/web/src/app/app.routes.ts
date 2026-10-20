import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'documents' },
  {
    path: 'documents',
    loadComponent: () =>
      import('./features/documents/document-list/document-list').then((m) => m.DocumentList),
  },
  {
    path: 'documents/:id',
    loadComponent: () =>
      import('./features/builder/builder-page/builder-page').then((m) => m.BuilderPage),
  },
  { path: '**', redirectTo: 'documents' },
];
