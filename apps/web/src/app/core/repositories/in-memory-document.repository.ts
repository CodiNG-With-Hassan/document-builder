import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Document, DocumentSummary } from '@Core/models/document.model';
import { DocumentRepository } from './document.repository';
import { DOCUMENT_SEED } from './document.seed';
import { RepositoryError, RepositoryErrorCode } from './repository-error';

/**
 * Mock backend: a hardcoded seed held in memory, so every reload starts from the seed again.
 * Answers synchronously and hands out deep clones, so callers can never mutate its state.
 */
@Injectable()
export class InMemoryDocumentRepository extends DocumentRepository {
  private readonly documents = signal<Document[]>(structuredClone([...DOCUMENT_SEED]));

  list(): Observable<DocumentSummary[]> {
    const summaries = this.documents()
      .map(({ id, title, updatedAt }) => ({ id, title, updatedAt }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return of(summaries);
  }

  get(id: string): Observable<Document> {
    const document = this.find(id);
    return document
      ? of(structuredClone(document))
      : this.fail(RepositoryErrorCode.DocumentNotFound);
  }

  create(title: string): Observable<Document> {
    const titleError = this.validateTitle(title);
    if (titleError) return this.fail(titleError);

    const document: Document = {
      id: crypto.randomUUID(),
      title: title.trim(),
      sections: [{ id: crypto.randomUUID(), title: '', numbered: true, widgets: [], layout: [] }],
      updatedAt: new Date().toISOString(),
    };
    this.documents.update((documents) => [...documents, document]);
    return of(structuredClone(document));
  }

  rename(id: string, title: string): Observable<Document> {
    const document = this.find(id);
    if (!document) return this.fail(RepositoryErrorCode.DocumentNotFound);

    const titleError = this.validateTitle(title, id);
    if (titleError) return this.fail(titleError);

    return this.write({ ...document, title: title.trim() });
  }

  save(document: Document): Observable<Document> {
    if (!this.find(document.id)) return this.fail(RepositoryErrorCode.DocumentNotFound);
    return this.write(document);
  }

  delete(id: string): Observable<void> {
    this.documents.update((documents) => documents.filter((document) => document.id !== id));
    return of(undefined);
  }

  private write(document: Document): Observable<Document> {
    const stored: Document = { ...structuredClone(document), updatedAt: new Date().toISOString() };
    this.documents.update((documents) =>
      documents.map((existing) => (existing.id === stored.id ? stored : existing)),
    );
    return of(structuredClone(stored));
  }

  private find(id: string): Document | undefined {
    return this.documents().find((document) => document.id === id);
  }

  /** Titles are required and unique, compared trimmed and case-insensitively. */
  private validateTitle(title: string, ownId?: string): RepositoryErrorCode | null {
    const normalized = title.trim().toLocaleLowerCase();
    if (!normalized) return RepositoryErrorCode.DocumentTitleRequired;

    const taken = this.documents().some(
      (document) =>
        document.id !== ownId && document.title.trim().toLocaleLowerCase() === normalized,
    );
    return taken ? RepositoryErrorCode.DocumentTitleTaken : null;
  }

  private fail(code: RepositoryErrorCode): Observable<never> {
    return throwError(() => new RepositoryError(code));
  }
}
