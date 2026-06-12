/**
 * Public surface of `@wexio/messenger-widget-angular`. ng-packagr uses
 * this file as the package entry point (see `ng-package.json`).
 *
 * The widget runtime (`widget.js`) is shipped alongside the compiled
 * Angular library and is copied into `dist/` via `ng-package.json`'s
 * `assets` block. Consumers don't import `widget.js` directly — the
 * Angular component registers + uses the custom element at boot.
 */
export { WexioWidgetComponent } from "./wexio-widget.component";
export type { VisitorIdentity } from "./wexio-widget.component";
