// @ts-check
const base = require('@coding-with-hassan/eslint-config-spa')({
  prefix: 'app',
  tsconfigRootDir: __dirname,
});

module.exports = [
  ...base,
  {
    files: ['**/*.ts'],
    rules: {
      // Every form in this app uses signal forms (@angular/forms/signals);
      // template-driven and reactive forms are both banned. Blocking the
      // module imports keeps their directives out of every template.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/forms',
              importNames: ['FormsModule', 'ReactiveFormsModule', 'FormBuilder'],
              message:
                'Template-driven and reactive forms are banned — use signal forms (@angular/forms/signals) with [formField].',
            },
          ],
        },
      ],
    },
  },
];
