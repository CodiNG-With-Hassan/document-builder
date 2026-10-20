// Targets are derived from the workspace (every project with an ESLint/Prettier config).
// Options: { exclude: ['api-client'] } to leave a project alone (e.g. generated code that must
// stay as its generator wrote it), { extra: { 'scripts/**/*.mjs': ['prettier --write'] } } for
// files outside any project.
import lintStaged from '@coding-with-hassan/devkit/lint-staged';

export default lintStaged();
