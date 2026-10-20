export enum RepositoryErrorCode {
  DocumentNotFound = 'DOCUMENT_NOT_FOUND',
  DocumentTitleRequired = 'DOCUMENT_TITLE_REQUIRED',
  DocumentTitleTaken = 'DOCUMENT_TITLE_TAKEN',
}

export class RepositoryError extends Error {
  constructor(readonly code: RepositoryErrorCode) {
    super(code);
    this.name = 'RepositoryError';
  }
}

export function isRepositoryError(error: unknown): error is RepositoryError {
  return error instanceof RepositoryError;
}
