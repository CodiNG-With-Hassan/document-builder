# gridstack for Section layout, despite the "Angular + PrimeNG only" constraint

The frontend is meant to use only Angular and PrimeNG. We made one exception: each Section's grid uses gridstack, through its Angular wrapper. The builder gives each Section a free 2D grid (12 columns, 20px rows, layout stored as `{id,x,y,w,h}` per Widget) and supports dragging Widgets between Sections. gridstack gives us dragging, resizing, upward reflow, dropping Widgets from an external palette, and moving them across grids out of the box.

## Considered Options

- **Angular CDK drag-drop + custom resize.** This would keep the stack pure Angular. However, CDK drag-drop only supports sorting items in a list along one axis, not 2D grid placement. We would have to write our own collision handling, reflow and resize, and that alone would be bigger than the rest of the demo.

## Consequences

Swapping gridstack out later means rewriting the Section grid, the cross-Section drag and the palette drag-in. The persisted layout shape (`x/y/w/h` on a 12-column grid) is engine-neutral and would survive the swap. Patching gridstack internals so that the model owns the items is a known trap; we avoid it and keep gridstack driven only through its public API.
