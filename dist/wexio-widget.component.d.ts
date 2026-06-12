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
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import * as i0 from "@angular/core";
/** Known-user identity proof. Provide ONE of `googleIdToken`, `jwt`,
 *  or the legacy `userId` + `userHash` pair. */
export interface VisitorIdentity {
    googleIdToken?: string;
    jwt?: string;
    userId?: string;
    userHash?: string;
    name?: string;
    email?: string;
    phone?: string;
    attributes?: Record<string, unknown>;
}
interface WexioWidgetElement extends HTMLElement {
    identify(user: VisitorIdentity | null): void;
}
export declare class WexioWidgetComponent implements AfterViewInit, OnChanges, OnDestroy {
    /** Wexio integration public key (`pk_live_...`). Omit for demo mode. */
    publicKey?: string;
    /** UI locale (BCP-47). Overrides the operator's `localeStrategy`. */
    locale?: string;
    /** Force widget mode. Public consumers should not set this. */
    mode?: "production" | "preview" | "demo";
    /** Unverified prechat prefill. */
    prefillName?: string;
    /** Unverified prechat prefill. */
    prefillEmail?: string;
    /** Unverified prechat prefill. */
    prefillPhone?: string;
    /** Known-user identity proof. Pass `null` to log out. */
    user?: VisitorIdentity | null;
    /** Fires every time panel dimensions change (open ↔ closed). */
    resize: EventEmitter<{
        width: number;
        height: number;
    }>;
    /** Fires when the visitor closes the panel. */
    close: EventEmitter<void>;
    elRef: ElementRef<WexioWidgetElement>;
    private onResize;
    private onClose;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WexioWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WexioWidgetComponent, "wexio-widget-ng", never, { "publicKey": { "alias": "publicKey"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "prefillName": { "alias": "prefillName"; "required": false; }; "prefillEmail": { "alias": "prefillEmail"; "required": false; }; "prefillPhone": { "alias": "prefillPhone"; "required": false; }; "user": { "alias": "user"; "required": false; }; }, { "resize": "resize"; "close": "close"; }, never, never, true, never>;
}
export {};
