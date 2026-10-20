import { Document, Section } from '@Core/models/document.model';

export const UNDO_LIMIT = 50;

/** What undo/redo restores: the parts of a Document the builder can change. */
export interface DocumentSnapshot {
  title: string;
  sections: Section[];
}

/** Documents are only ever replaced, never mutated, so a snapshot can share their references. */
export function snapshotOf(document: Document): DocumentSnapshot {
  return { title: document.title, sections: document.sections };
}

export function applySnapshot(document: Document, snapshot: DocumentSnapshot): Document {
  return { ...document, title: snapshot.title, sections: snapshot.sections };
}

/** Pushes onto a history stack, dropping the oldest entry beyond UNDO_LIMIT. */
export function pushSnapshot(
  stack: readonly DocumentSnapshot[],
  snapshot: DocumentSnapshot,
): DocumentSnapshot[] {
  return [...stack, snapshot].slice(-UNDO_LIMIT);
}
