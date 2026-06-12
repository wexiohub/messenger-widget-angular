import * as i0 from '@angular/core';
import { EventEmitter, ViewChild, Output, Input, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

/**
 * `@wexio/messenger-widget-angular` — Angular standalone component
 * wrapping the `<wexio-widget>` custom element.
 *
 * Forwards `@Input()` properties to kebab-case attributes on the
 * underlying custom element and re-emits its `wexio:resize` /
 * `wexio:close` CustomEvents as Angular `@Output()` `EventEmitter`s.
 *
 * Importing this module side-effect registers `<wexio-widget>` as a
 * custom element — no separate script tag needed.
 *
 * Standalone — drop into any Angular component's `imports`:
 *
 *   import { WexioWidgetComponent } from "@wexio/messenger-widget-angular";
 *
 *   @Component({
 *     standalone: true,
 *     imports: [WexioWidgetComponent],
 *     template: `<wexio-widget-ng [publicKey]="pk" (close)="onClose()" />`,
 *   })
 *   export class AppComponent { ... }
 */
class WexioWidgetComponent {
    /** Wexio integration public key (`pk_live_...`). Omit for demo mode. */
    publicKey;
    /** UI locale (BCP-47). Overrides the operator's `localeStrategy`. */
    locale;
    /** Force widget mode. Public consumers should not set this. */
    mode;
    /** Unverified prechat prefill. */
    prefillName;
    /** Unverified prechat prefill. */
    prefillEmail;
    /** Unverified prechat prefill. */
    prefillPhone;
    /** Known-user identity proof. Pass `null` to log out. */
    user;
    /** Fires every time panel dimensions change (open ↔ closed). */
    resize = new EventEmitter();
    /** Fires when the visitor closes the panel. */
    close = new EventEmitter();
    elRef;
    onResize = (event) => {
        const detail = event
            .detail;
        if (detail)
            this.resize.emit(detail);
    };
    onClose = () => this.close.emit();
    ngAfterViewInit() {
        const el = this.elRef?.nativeElement;
        if (!el)
            return;
        // Runtime-inject the widget runtime once. We can't `import` it at
        // build time (ng-packagr's strict TS rejects bare-JS imports), so
        // we inject a `<script type="module">` here on first mount. The
        // browser caches the module after first load, so subsequent
        // component instances skip the network request entirely. Custom
        // element upgrades retroactively — the `<wexio-widget>` element
        // we already rendered will "upgrade" once the script registers
        // its class, with no re-render flicker.
        if (typeof document !== "undefined" &&
            typeof customElements !== "undefined" &&
            !customElements.get("wexio-widget") &&
            !document.querySelector("script[data-wexio-widget-runtime]")) {
            const script = document.createElement("script");
            script.type = "module";
            script.src = "https://cdn.wexio.io/widget/widget.js";
            script.setAttribute("data-wexio-widget-runtime", "");
            script.async = true;
            document.head.appendChild(script);
        }
        el.addEventListener("wexio:resize", this.onResize);
        el.addEventListener("wexio:close", this.onClose);
        if (this.user)
            el.identify?.(this.user);
    }
    ngOnChanges(changes) {
        if (changes["user"] && this.elRef?.nativeElement) {
            this.elRef.nativeElement.identify?.(this.user ?? null);
        }
    }
    ngOnDestroy() {
        const el = this.elRef?.nativeElement;
        if (!el)
            return;
        el.removeEventListener("wexio:resize", this.onResize);
        el.removeEventListener("wexio:close", this.onClose);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WexioWidgetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: WexioWidgetComponent, isStandalone: true, selector: "wexio-widget-ng", inputs: { publicKey: "publicKey", locale: "locale", mode: "mode", prefillName: "prefillName", prefillEmail: "prefillEmail", prefillPhone: "prefillPhone", user: "user" }, outputs: { resize: "resize", close: "close" }, viewQueries: [{ propertyName: "elRef", first: true, predicate: ["el"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `<wexio-widget
    #el
    [attr.public-key]="publicKey ?? null"
    [attr.locale]="locale ?? null"
    [attr.mode]="mode ?? null"
    [attr.prefill-name]="prefillName ?? null"
    [attr.prefill-email]="prefillEmail ?? null"
    [attr.prefill-phone]="prefillPhone ?? null"
  ></wexio-widget>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WexioWidgetComponent, decorators: [{
            type: Component,
            args: [{
                    standalone: true,
                    selector: "wexio-widget-ng",
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                    template: `<wexio-widget
    #el
    [attr.public-key]="publicKey ?? null"
    [attr.locale]="locale ?? null"
    [attr.mode]="mode ?? null"
    [attr.prefill-name]="prefillName ?? null"
    [attr.prefill-email]="prefillEmail ?? null"
    [attr.prefill-phone]="prefillPhone ?? null"
  ></wexio-widget>`,
                }]
        }], propDecorators: { publicKey: [{
                type: Input
            }], locale: [{
                type: Input
            }], mode: [{
                type: Input
            }], prefillName: [{
                type: Input
            }], prefillEmail: [{
                type: Input
            }], prefillPhone: [{
                type: Input
            }], user: [{
                type: Input
            }], resize: [{
                type: Output
            }], close: [{
                type: Output
            }], elRef: [{
                type: ViewChild,
                args: ["el", { static: true }]
            }] } });

/**
 * Public surface of `@wexio/messenger-widget-angular`. ng-packagr uses
 * this file as the package entry point (see `ng-package.json`).
 *
 * The widget runtime (`widget.js`) is shipped alongside the compiled
 * Angular library and is copied into `dist/` via `ng-package.json`'s
 * `assets` block. Consumers don't import `widget.js` directly — the
 * Angular component registers + uses the custom element at boot.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { WexioWidgetComponent };
//# sourceMappingURL=wexio-messenger-widget-angular.mjs.map
