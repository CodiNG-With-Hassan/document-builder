/**
 * The current value of the input/textarea an event came from. Form handlers read it from the
 * event rather than from their signal-forms model: the `(input)` handler can run before the
 * [formField] binding has written the model.
 */
export function inputValue(event: Event): string {
  return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
}
