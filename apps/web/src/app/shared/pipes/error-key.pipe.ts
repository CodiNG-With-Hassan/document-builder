import { Pipe, PipeTransform } from '@angular/core';
import { RepositoryErrorCode } from '@Core/repositories/repository-error';

/** Maps a repository error code onto its ERRORS.* translation key: `{{ code | errorKey | translate }}`. */
@Pipe({ name: 'errorKey' })
export class ErrorKeyPipe implements PipeTransform {
  transform(code: RepositoryErrorCode): string {
    return `ERRORS.${code}`;
  }
}
