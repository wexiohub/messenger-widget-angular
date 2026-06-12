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
var _a;
import { __decorate, __metadata } from "tslib";
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, Output, ViewChild, } from "@angular/core";
import "./widget.js";
let WexioWidgetComponent = class WexioWidgetComponent {
    constructor() {
        /** Fires every time panel dimensions change (open ↔ closed). */
        this.resize = new EventEmitter();
        /** Fires when the visitor closes the panel. */
        this.close = new EventEmitter();
        this.onResize = (event) => {
            const detail = event
                .detail;
            if (detail)
                this.resize.emit(detail);
        };
        this.onClose = () => this.close.emit();
    }
    ngAfterViewInit() {
        const el = this.elRef?.nativeElement;
        if (!el)
            return;
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
};
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "publicKey", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "mode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "prefillName", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "prefillEmail", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WexioWidgetComponent.prototype, "prefillPhone", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], WexioWidgetComponent.prototype, "user", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WexioWidgetComponent.prototype, "resize", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], WexioWidgetComponent.prototype, "close", void 0);
__decorate([
    ViewChild("el", { static: true }),
    __metadata("design:type", typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" ? _a : Object)
], WexioWidgetComponent.prototype, "elRef", void 0);
WexioWidgetComponent = __decorate([
    Component({
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
    })
], WexioWidgetComponent);
export { WexioWidgetComponent };
