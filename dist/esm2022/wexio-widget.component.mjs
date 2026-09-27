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
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild, } from "@angular/core";
import * as i0 from "@angular/core";
export class WexioWidgetComponent {
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
        const detail = event.detail;
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
        if (changes.user && this.elRef?.nativeElement) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2V4aW8td2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZXhpby13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULHNCQUFzQixFQUV0QixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBaUN2QixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLHdFQUF3RTtJQUMvRCxTQUFTLENBQVU7SUFDNUIscUVBQXFFO0lBQzVELE1BQU0sQ0FBVTtJQUN6QiwrREFBK0Q7SUFDdEQsSUFBSSxDQUFxQztJQUNsRCxrQ0FBa0M7SUFDekIsV0FBVyxDQUFVO0lBQzlCLGtDQUFrQztJQUN6QixZQUFZLENBQVU7SUFDL0Isa0NBQWtDO0lBQ3pCLFlBQVksQ0FBVTtJQUMvQix5REFBeUQ7SUFDaEQsSUFBSSxDQUEwQjtJQUV2QyxnRUFBZ0U7SUFDdEQsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFxQyxDQUFDO0lBQ3pFLCtDQUErQztJQUNyQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUczQyxLQUFLLENBQWtDO0lBRS9CLFFBQVEsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO1FBQ2xDLE1BQU0sTUFBTSxHQUFJLEtBQXdELENBQUMsTUFBTSxDQUFDO1FBQ2hGLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFDLGVBQWU7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsa0VBQWtFO1FBQ2xFLGtFQUFrRTtRQUNsRSxnRUFBZ0U7UUFDaEUsNERBQTREO1FBQzVELGdFQUFnRTtRQUNoRSxnRUFBZ0U7UUFDaEUsK0RBQStEO1FBQy9ELHdDQUF3QztRQUN4QyxJQUNFLE9BQU8sUUFBUSxLQUFLLFdBQVc7WUFDL0IsT0FBTyxjQUFjLEtBQUssV0FBVztZQUNyQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQ25DLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUM1RCxDQUFDO1lBQ0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN2QixNQUFNLENBQUMsR0FBRyxHQUFHLHVDQUF1QyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxZQUFZLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN6RCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQzt3R0F2RVUsb0JBQW9COzRGQUFwQixvQkFBb0Isb2FBVnJCOzs7Ozs7OzttQkFRTzs7NEZBRU4sb0JBQW9CO2tCQWRoQyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakMsUUFBUSxFQUFFOzs7Ozs7OzttQkFRTztpQkFDbEI7OEJBR1UsU0FBUztzQkFBakIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFHSSxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUdQLEtBQUs7c0JBREosU0FBUzt1QkFBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBgQHdleGlvL21lc3Nlbmdlci13aWRnZXQtYW5ndWxhcmAg4oCUIEFuZ3VsYXIgc3RhbmRhbG9uZSBjb21wb25lbnRcbiAqIHdyYXBwaW5nIHRoZSBgPHdleGlvLXdpZGdldD5gIGN1c3RvbSBlbGVtZW50LlxuICpcbiAqIEZvcndhcmRzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0byBrZWJhYi1jYXNlIGF0dHJpYnV0ZXMgb24gdGhlXG4gKiB1bmRlcmx5aW5nIGN1c3RvbSBlbGVtZW50IGFuZCByZS1lbWl0cyBpdHMgYHdleGlvOnJlc2l6ZWAgL1xuICogYHdleGlvOmNsb3NlYCBDdXN0b21FdmVudHMgYXMgQW5ndWxhciBgQE91dHB1dCgpYCBgRXZlbnRFbWl0dGVyYHMuXG4gKlxuICogSW1wb3J0aW5nIHRoaXMgbW9kdWxlIHNpZGUtZWZmZWN0IHJlZ2lzdGVycyBgPHdleGlvLXdpZGdldD5gIGFzIGFcbiAqIGN1c3RvbSBlbGVtZW50IOKAlCBubyBzZXBhcmF0ZSBzY3JpcHQgdGFnIG5lZWRlZC5cbiAqXG4gKiBTdGFuZGFsb25lIOKAlCBkcm9wIGludG8gYW55IEFuZ3VsYXIgY29tcG9uZW50J3MgYGltcG9ydHNgOlxuICpcbiAqICAgaW1wb3J0IHsgV2V4aW9XaWRnZXRDb21wb25lbnQgfSBmcm9tIFwiQHdleGlvL21lc3Nlbmdlci13aWRnZXQtYW5ndWxhclwiO1xuICpcbiAqICAgQENvbXBvbmVudCh7XG4gKiAgICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAqICAgICBpbXBvcnRzOiBbV2V4aW9XaWRnZXRDb21wb25lbnRdLFxuICogICAgIHRlbXBsYXRlOiBgPHdleGlvLXdpZGdldC1uZyBbcHVibGljS2V5XT1cInBrXCIgKGNsb3NlKT1cIm9uQ2xvc2UoKVwiIC8+YCxcbiAqICAgfSlcbiAqICAgZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7IC4uLiB9XG4gKi9cblxuaW1wb3J0IHtcbiAgdHlwZSBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIHR5cGUgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgdHlwZSBPbkNoYW5nZXMsXG4gIHR5cGUgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIHR5cGUgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKiogS25vd24tdXNlciBpZGVudGl0eSBwcm9vZi4gUHJvdmlkZSBPTkUgb2YgYGdvb2dsZUlkVG9rZW5gLCBgand0YCxcbiAqICBvciB0aGUgbGVnYWN5IGB1c2VySWRgICsgYHVzZXJIYXNoYCBwYWlyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBWaXNpdG9ySWRlbnRpdHkge1xuICBnb29nbGVJZFRva2VuPzogc3RyaW5nO1xuICBqd3Q/OiBzdHJpbmc7XG4gIHVzZXJJZD86IHN0cmluZztcbiAgdXNlckhhc2g/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGVtYWlsPzogc3RyaW5nO1xuICBwaG9uZT86IHN0cmluZztcbiAgYXR0cmlidXRlcz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufVxuXG5pbnRlcmZhY2UgV2V4aW9XaWRnZXRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBpZGVudGlmeSh1c2VyOiBWaXNpdG9ySWRlbnRpdHkgfCBudWxsKTogdm9pZDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiBcIndleGlvLXdpZGdldC1uZ1wiLFxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV0sXG4gIHRlbXBsYXRlOiBgPHdleGlvLXdpZGdldFxuICAgICNlbFxuICAgIFthdHRyLnB1YmxpYy1rZXldPVwicHVibGljS2V5ID8/IG51bGxcIlxuICAgIFthdHRyLmxvY2FsZV09XCJsb2NhbGUgPz8gbnVsbFwiXG4gICAgW2F0dHIubW9kZV09XCJtb2RlID8/IG51bGxcIlxuICAgIFthdHRyLnByZWZpbGwtbmFtZV09XCJwcmVmaWxsTmFtZSA/PyBudWxsXCJcbiAgICBbYXR0ci5wcmVmaWxsLWVtYWlsXT1cInByZWZpbGxFbWFpbCA/PyBudWxsXCJcbiAgICBbYXR0ci5wcmVmaWxsLXBob25lXT1cInByZWZpbGxQaG9uZSA/PyBudWxsXCJcbiAgPjwvd2V4aW8td2lkZ2V0PmAsXG59KVxuZXhwb3J0IGNsYXNzIFdleGlvV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogV2V4aW8gaW50ZWdyYXRpb24gcHVibGljIGtleSAoYHBrX2xpdmVfLi4uYCkuIE9taXQgZm9yIGRlbW8gbW9kZS4gKi9cbiAgQElucHV0KCkgcHVibGljS2V5Pzogc3RyaW5nO1xuICAvKiogVUkgbG9jYWxlIChCQ1AtNDcpLiBPdmVycmlkZXMgdGhlIG9wZXJhdG9yJ3MgYGxvY2FsZVN0cmF0ZWd5YC4gKi9cbiAgQElucHV0KCkgbG9jYWxlPzogc3RyaW5nO1xuICAvKiogRm9yY2Ugd2lkZ2V0IG1vZGUuIFB1YmxpYyBjb25zdW1lcnMgc2hvdWxkIG5vdCBzZXQgdGhpcy4gKi9cbiAgQElucHV0KCkgbW9kZT86IFwicHJvZHVjdGlvblwiIHwgXCJwcmV2aWV3XCIgfCBcImRlbW9cIjtcbiAgLyoqIFVudmVyaWZpZWQgcHJlY2hhdCBwcmVmaWxsLiAqL1xuICBASW5wdXQoKSBwcmVmaWxsTmFtZT86IHN0cmluZztcbiAgLyoqIFVudmVyaWZpZWQgcHJlY2hhdCBwcmVmaWxsLiAqL1xuICBASW5wdXQoKSBwcmVmaWxsRW1haWw/OiBzdHJpbmc7XG4gIC8qKiBVbnZlcmlmaWVkIHByZWNoYXQgcHJlZmlsbC4gKi9cbiAgQElucHV0KCkgcHJlZmlsbFBob25lPzogc3RyaW5nO1xuICAvKiogS25vd24tdXNlciBpZGVudGl0eSBwcm9vZi4gUGFzcyBgbnVsbGAgdG8gbG9nIG91dC4gKi9cbiAgQElucHV0KCkgdXNlcj86IFZpc2l0b3JJZGVudGl0eSB8IG51bGw7XG5cbiAgLyoqIEZpcmVzIGV2ZXJ5IHRpbWUgcGFuZWwgZGltZW5zaW9ucyBjaGFuZ2UgKG9wZW4g4oaUIGNsb3NlZCkuICovXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfT4oKTtcbiAgLyoqIEZpcmVzIHdoZW4gdGhlIHZpc2l0b3IgY2xvc2VzIHRoZSBwYW5lbC4gKi9cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoXCJlbFwiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBlbFJlZiE6IEVsZW1lbnRSZWY8V2V4aW9XaWRnZXRFbGVtZW50PjtcblxuICBwcml2YXRlIG9uUmVzaXplID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IGRldGFpbCA9IChldmVudCBhcyBDdXN0b21FdmVudDx7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0+KS5kZXRhaWw7XG4gICAgaWYgKGRldGFpbCkgdGhpcy5yZXNpemUuZW1pdChkZXRhaWwpO1xuICB9O1xuXG4gIHByaXZhdGUgb25DbG9zZSA9ICgpID0+IHRoaXMuY2xvc2UuZW1pdCgpO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWxSZWY/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIC8vIFJ1bnRpbWUtaW5qZWN0IHRoZSB3aWRnZXQgcnVudGltZSBvbmNlLiBXZSBjYW4ndCBgaW1wb3J0YCBpdCBhdFxuICAgIC8vIGJ1aWxkIHRpbWUgKG5nLXBhY2thZ3IncyBzdHJpY3QgVFMgcmVqZWN0cyBiYXJlLUpTIGltcG9ydHMpLCBzb1xuICAgIC8vIHdlIGluamVjdCBhIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5gIGhlcmUgb24gZmlyc3QgbW91bnQuIFRoZVxuICAgIC8vIGJyb3dzZXIgY2FjaGVzIHRoZSBtb2R1bGUgYWZ0ZXIgZmlyc3QgbG9hZCwgc28gc3Vic2VxdWVudFxuICAgIC8vIGNvbXBvbmVudCBpbnN0YW5jZXMgc2tpcCB0aGUgbmV0d29yayByZXF1ZXN0IGVudGlyZWx5LiBDdXN0b21cbiAgICAvLyBlbGVtZW50IHVwZ3JhZGVzIHJldHJvYWN0aXZlbHkg4oCUIHRoZSBgPHdleGlvLXdpZGdldD5gIGVsZW1lbnRcbiAgICAvLyB3ZSBhbHJlYWR5IHJlbmRlcmVkIHdpbGwgXCJ1cGdyYWRlXCIgb25jZSB0aGUgc2NyaXB0IHJlZ2lzdGVyc1xuICAgIC8vIGl0cyBjbGFzcywgd2l0aCBubyByZS1yZW5kZXIgZmxpY2tlci5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgIHR5cGVvZiBjdXN0b21FbGVtZW50cyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgIWN1c3RvbUVsZW1lbnRzLmdldChcIndleGlvLXdpZGdldFwiKSAmJlxuICAgICAgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzY3JpcHRbZGF0YS13ZXhpby13aWRnZXQtcnVudGltZV1cIilcbiAgICApIHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICBzY3JpcHQudHlwZSA9IFwibW9kdWxlXCI7XG4gICAgICBzY3JpcHQuc3JjID0gXCJodHRwczovL2Nkbi53ZXhpby5pby93aWRnZXQvd2lkZ2V0LmpzXCI7XG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZXhpby13aWRnZXQtcnVudGltZVwiLCBcIlwiKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpyZXNpemVcIiwgdGhpcy5vblJlc2l6ZSk7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIndleGlvOmNsb3NlXCIsIHRoaXMub25DbG9zZSk7XG4gICAgaWYgKHRoaXMudXNlcikgZWwuaWRlbnRpZnk/Lih0aGlzLnVzZXIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnVzZXIgJiYgdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmlkZW50aWZ5Py4odGhpcy51c2VyID8/IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndleGlvOnJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2V4aW86Y2xvc2VcIiwgdGhpcy5vbkNsb3NlKTtcbiAgfVxufVxuIl19