import { Observable } from 'rxjs';
import { Document, DocumentSummary } from '@Core/models/document.model';

/**
 * The boundary the app talks to for Documents. Bound to `InMemoryDocumentRepository` in
 * app.config.ts; a real HTTP implementation would replace only that binding.
 */
export abstract class DocumentRepository {
  /** Sorted by `updatedAt`, newest first. */
  abstract list(): Observable<DocumentSummary[]>;
  /** Errors with DOCUMENT_NOT_FOUND. */
  abstract get(id: string): Observable<Document>;
  /** Creates a Document with one empty Section. Errors with DOCUMENT_TITLE_REQUIRED | DOCUMENT_TITLE_TAKEN. */
  abstract create(title: string): Observable<Document>;
  /** Same title errors as `create`, plus DOCUMENT_NOT_FOUND. */
  abstract rename(id: string, title: string): Observable<Document>;
  /** Whole-Document write-through. Errors with DOCUMENT_NOT_FOUND. */
  abstract save(document: Document): Observable<Document>;
  abstract delete(id: string): Observable<void>;
}
