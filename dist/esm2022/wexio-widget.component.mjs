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
    /** Open the panel on mount (uncontrolled afterwards). */
    defaultOpen;
    /** Controlled open state; keep it in sync from `(opened)` / `(close)`. Leave unset for uncontrolled. */
    open;
    /** Navigate to a tab / article without a remount (and open the panel). */
    previewTab;
    /** Fires every time panel dimensions change (open ↔ closed). */
    resize = new EventEmitter();
    /** Fires when the panel opens. */
    opened = new EventEmitter();
    /** Fires when the visitor closes the panel. */
    close = new EventEmitter();
    elRef;
    onResize = (event) => {
        const detail = event.detail;
        if (detail)
            this.resize.emit(detail);
    };
    onOpen = () => this.opened.emit();
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
        el.addEventListener("wexio:open", this.onOpen);
        el.addEventListener("wexio:close", this.onClose);
        // `previewTab` is an object, so it goes through the element's JS property.
        if (this.previewTab)
            el.previewTab = this.previewTab;
        if (this.user)
            el.identify?.(this.user);
    }
    ngOnChanges(changes) {
        if (changes.previewTab && this.elRef?.nativeElement) {
            this.elRef.nativeElement.previewTab = this.previewTab;
        }
        if (changes.user && this.elRef?.nativeElement) {
            this.elRef.nativeElement.identify?.(this.user ?? null);
        }
    }
    ngOnDestroy() {
        const el = this.elRef?.nativeElement;
        if (!el)
            return;
        el.removeEventListener("wexio:resize", this.onResize);
        el.removeEventListener("wexio:open", this.onOpen);
        el.removeEventListener("wexio:close", this.onClose);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WexioWidgetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: WexioWidgetComponent, isStandalone: true, selector: "wexio-widget-ng", inputs: { publicKey: "publicKey", locale: "locale", mode: "mode", prefillName: "prefillName", prefillEmail: "prefillEmail", prefillPhone: "prefillPhone", user: "user", defaultOpen: "defaultOpen", open: "open", previewTab: "previewTab" }, outputs: { resize: "resize", opened: "opened", close: "close" }, viewQueries: [{ propertyName: "elRef", first: true, predicate: ["el"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `<wexio-widget
    #el
    [attr.public-key]="publicKey ?? null"
    [attr.locale]="locale ?? null"
    [attr.mode]="mode ?? null"
    [attr.prefill-name]="prefillName ?? null"
    [attr.prefill-email]="prefillEmail ?? null"
    [attr.prefill-phone]="prefillPhone ?? null"
    [attr.default-open]="defaultOpen == null ? null : defaultOpen ? 'true' : 'false'"
    [attr.open]="open == null ? null : open ? 'true' : 'false'"
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
    [attr.default-open]="defaultOpen == null ? null : defaultOpen ? 'true' : 'false'"
    [attr.open]="open == null ? null : open ? 'true' : 'false'"
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
            }], defaultOpen: [{
                type: Input
            }], open: [{
                type: Input
            }], previewTab: [{
                type: Input
            }], resize: [{
                type: Output
            }], opened: [{
                type: Output
            }], close: [{
                type: Output
            }], elRef: [{
                type: ViewChild,
                args: ["el", { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2V4aW8td2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZXhpby13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULHNCQUFzQixFQUV0QixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBNEN2QixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLHdFQUF3RTtJQUMvRCxTQUFTLENBQVU7SUFDNUIscUVBQXFFO0lBQzVELE1BQU0sQ0FBVTtJQUN6QiwrREFBK0Q7SUFDdEQsSUFBSSxDQUFxQztJQUNsRCxrQ0FBa0M7SUFDekIsV0FBVyxDQUFVO0lBQzlCLGtDQUFrQztJQUN6QixZQUFZLENBQVU7SUFDL0Isa0NBQWtDO0lBQ3pCLFlBQVksQ0FBVTtJQUMvQix5REFBeUQ7SUFDaEQsSUFBSSxDQUEwQjtJQUN2Qyx5REFBeUQ7SUFDaEQsV0FBVyxDQUFXO0lBQy9CLHdHQUF3RztJQUMvRixJQUFJLENBQVc7SUFDeEIsMEVBQTBFO0lBQ2pFLFVBQVUsQ0FBb0I7SUFFdkMsZ0VBQWdFO0lBQ3RELE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBcUMsQ0FBQztJQUN6RSxrQ0FBa0M7SUFDeEIsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFDNUMsK0NBQStDO0lBQ3JDLEtBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBRzNDLEtBQUssQ0FBa0M7SUFFL0IsUUFBUSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7UUFDbEMsTUFBTSxNQUFNLEdBQUksS0FBd0QsQ0FBQyxNQUFNLENBQUM7UUFDaEYsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxD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QVVPOzs0RkFFTixvQkFBb0I7a0JBaEJoQyxTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7O21CQVVPO2lCQUNsQjs4QkFHVSxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR0ksTUFBTTtzQkFBZixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxLQUFLO3NCQUFkLE1BQU07Z0JBR1AsS0FBSztzQkFESixTQUFTO3VCQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGBAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyYCDigJQgQW5ndWxhciBzdGFuZGFsb25lIGNvbXBvbmVudFxuICogd3JhcHBpbmcgdGhlIGA8d2V4aW8td2lkZ2V0PmAgY3VzdG9tIGVsZW1lbnQuXG4gKlxuICogRm9yd2FyZHMgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRvIGtlYmFiLWNhc2UgYXR0cmlidXRlcyBvbiB0aGVcbiAqIHVuZGVybHlpbmcgY3VzdG9tIGVsZW1lbnQgYW5kIHJlLWVtaXRzIGl0cyBgd2V4aW86cmVzaXplYCAvXG4gKiBgd2V4aW86Y2xvc2VgIEN1c3RvbUV2ZW50cyBhcyBBbmd1bGFyIGBAT3V0cHV0KClgIGBFdmVudEVtaXR0ZXJgcy5cbiAqXG4gKiBJbXBvcnRpbmcgdGhpcyBtb2R1bGUgc2lkZS1lZmZlY3QgcmVnaXN0ZXJzIGA8d2V4aW8td2lkZ2V0PmAgYXMgYVxuICogY3VzdG9tIGVsZW1lbnQg4oCUIG5vIHNlcGFyYXRlIHNjcmlwdCB0YWcgbmVlZGVkLlxuICpcbiAqIFN0YW5kYWxvbmUg4oCUIGRyb3AgaW50byBhbnkgQW5ndWxhciBjb21wb25lbnQncyBgaW1wb3J0c2A6XG4gKlxuICogICBpbXBvcnQgeyBXZXhpb1dpZGdldENvbXBvbmVudCB9IGZyb20gXCJAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyXCI7XG4gKlxuICogICBAQ29tcG9uZW50KHtcbiAqICAgICBzdGFuZGFsb25lOiB0cnVlLFxuICogICAgIGltcG9ydHM6IFtXZXhpb1dpZGdldENvbXBvbmVudF0sXG4gKiAgICAgdGVtcGxhdGU6IGA8d2V4aW8td2lkZ2V0LW5nIFtwdWJsaWNLZXldPVwicGtcIiAoY2xvc2UpPVwib25DbG9zZSgpXCIgLz5gLFxuICogICB9KVxuICogICBleHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHsgLi4uIH1cbiAqL1xuXG5pbXBvcnQge1xuICB0eXBlIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcbiAgdHlwZSBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICB0eXBlIE9uQ2hhbmdlcyxcbiAgdHlwZSBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgdHlwZSBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKiBLbm93bi11c2VyIGlkZW50aXR5IHByb29mLiBQcm92aWRlIE9ORSBvZiBgZ29vZ2xlSWRUb2tlbmAsIGBqd3RgLFxuICogIG9yIHRoZSBsZWdhY3kgYHVzZXJJZGAgKyBgdXNlckhhc2hgIHBhaXIuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpc2l0b3JJZGVudGl0eSB7XG4gIGdvb2dsZUlkVG9rZW4/OiBzdHJpbmc7XG4gIGp3dD86IHN0cmluZztcbiAgdXNlcklkPzogc3RyaW5nO1xuICB1c2VySGFzaD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG4gIHBob25lPzogc3RyaW5nO1xuICBhdHRyaWJ1dGVzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG5cbi8qKiBOYXZpZ2F0aW9uIHJlcXVlc3Q6IGdvIHRvIGEgdGFiIChhbmQgb3B0aW9uYWxseSBhIGhlbHAgYXJ0aWNsZSAvIG5ld3MgcG9zdClcbiAqICB3aXRob3V0IGEgcmVtb3VudCBhbmQgb3BlbiB0aGUgcGFuZWwuIEEgbmV3IGBub25jZWAgcmUtaXNzdWVzIHRoZSByZXF1ZXN0LiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3VGFiU2lnbmFsIHtcbiAgdGFiOiBcImhvbWVcIiB8IFwibWVzc2FnZXNcIiB8IFwiaGVscFwiIHwgXCJuZXdzXCIgfCBcInByb2ZpbGVcIjtcbiAgbm9uY2U6IG51bWJlcjtcbiAgYXJ0aWNsZT86IHsga2luZDogXCJoZWxwXCI7IHNsdWc6IHN0cmluZyB9IHwgeyBraW5kOiBcIm5ld3NcIjsgaWQ6IHN0cmluZyB9O1xufVxuXG5pbnRlcmZhY2UgV2V4aW9XaWRnZXRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBpZGVudGlmeSh1c2VyOiBWaXNpdG9ySWRlbnRpdHkgfCBudWxsKTogdm9pZDtcbiAgcHJldmlld1RhYj86IFByZXZpZXdUYWJTaWduYWw7XG59XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogXCJ3ZXhpby13aWRnZXQtbmdcIixcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxuICB0ZW1wbGF0ZTogYDx3ZXhpby13aWRnZXRcbiAgICAjZWxcbiAgICBbYXR0ci5wdWJsaWMta2V5XT1cInB1YmxpY0tleSA/PyBudWxsXCJcbiAgICBbYXR0ci5sb2NhbGVdPVwibG9jYWxlID8/IG51bGxcIlxuICAgIFthdHRyLm1vZGVdPVwibW9kZSA/PyBudWxsXCJcbiAgICBbYXR0ci5wcmVmaWxsLW5hbWVdPVwicHJlZmlsbE5hbWUgPz8gbnVsbFwiXG4gICAgW2F0dHIucHJlZmlsbC1lbWFpbF09XCJwcmVmaWxsRW1haWwgPz8gbnVsbFwiXG4gICAgW2F0dHIucHJlZmlsbC1waG9uZV09XCJwcmVmaWxsUGhvbmUgPz8gbnVsbFwiXG4gICAgW2F0dHIuZGVmYXVsdC1vcGVuXT1cImRlZmF1bHRPcGVuID09IG51bGwgPyBudWxsIDogZGVmYXVsdE9wZW4gPyAndHJ1ZScgOiAnZmFsc2UnXCJcbiAgICBbYXR0ci5vcGVuXT1cIm9wZW4gPT0gbnVsbCA/IG51bGwgOiBvcGVuID8gJ3RydWUnIDogJ2ZhbHNlJ1wiXG4gID48L3dleGlvLXdpZGdldD5gLFxufSlcbmV4cG9ydCBjbGFzcyBXZXhpb1dpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFdleGlvIGludGVncmF0aW9uIHB1YmxpYyBrZXkgKGBwa19saXZlXy4uLmApLiBPbWl0IGZvciBkZW1vIG1vZGUuICovXG4gIEBJbnB1dCgpIHB1YmxpY0tleT86IHN0cmluZztcbiAgLyoqIFVJIGxvY2FsZSAoQkNQLTQ3KS4gT3ZlcnJpZGVzIHRoZSBvcGVyYXRvcidzIGBsb2NhbGVTdHJhdGVneWAuICovXG4gIEBJbnB1dCgpIGxvY2FsZT86IHN0cmluZztcbiAgLyoqIEZvcmNlIHdpZGdldCBtb2RlLiBQdWJsaWMgY29uc3VtZXJzIHNob3VsZCBub3Qgc2V0IHRoaXMuICovXG4gIEBJbnB1dCgpIG1vZGU/OiBcInByb2R1Y3Rpb25cIiB8IFwicHJldmlld1wiIHwgXCJkZW1vXCI7XG4gIC8qKiBVbnZlcmlmaWVkIHByZWNoYXQgcHJlZmlsbC4gKi9cbiAgQElucHV0KCkgcHJlZmlsbE5hbWU/OiBzdHJpbmc7XG4gIC8qKiBVbnZlcmlmaWVkIHByZWNoYXQgcHJlZmlsbC4gKi9cbiAgQElucHV0KCkgcHJlZmlsbEVtYWlsPzogc3RyaW5nO1xuICAvKiogVW52ZXJpZmllZCBwcmVjaGF0IHByZWZpbGwuICovXG4gIEBJbnB1dCgpIHByZWZpbGxQaG9uZT86IHN0cmluZztcbiAgLyoqIEtub3duLXVzZXIgaWRlbnRpdHkgcHJvb2YuIFBhc3MgYG51bGxgIHRvIGxvZyBvdXQuICovXG4gIEBJbnB1dCgpIHVzZXI/OiBWaXNpdG9ySWRlbnRpdHkgfCBudWxsO1xuICAvKiogT3BlbiB0aGUgcGFuZWwgb24gbW91bnQgKHVuY29udHJvbGxlZCBhZnRlcndhcmRzKS4gKi9cbiAgQElucHV0KCkgZGVmYXVsdE9wZW4/OiBib29sZWFuO1xuICAvKiogQ29udHJvbGxlZCBvcGVuIHN0YXRlOyBrZWVwIGl0IGluIHN5bmMgZnJvbSBgKG9wZW5lZClgIC8gYChjbG9zZSlgLiBMZWF2ZSB1bnNldCBmb3IgdW5jb250cm9sbGVkLiAqL1xuICBASW5wdXQoKSBvcGVuPzogYm9vbGVhbjtcbiAgLyoqIE5hdmlnYXRlIHRvIGEgdGFiIC8gYXJ0aWNsZSB3aXRob3V0IGEgcmVtb3VudCAoYW5kIG9wZW4gdGhlIHBhbmVsKS4gKi9cbiAgQElucHV0KCkgcHJldmlld1RhYj86IFByZXZpZXdUYWJTaWduYWw7XG5cbiAgLyoqIEZpcmVzIGV2ZXJ5IHRpbWUgcGFuZWwgZGltZW5zaW9ucyBjaGFuZ2UgKG9wZW4g4oaUIGNsb3NlZCkuICovXG4gIEBPdXRwdXQoKSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfT4oKTtcbiAgLyoqIEZpcmVzIHdoZW4gdGhlIHBhbmVsIG9wZW5zLiAqL1xuICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAvKiogRmlyZXMgd2hlbiB0aGUgdmlzaXRvciBjbG9zZXMgdGhlIHBhbmVsLiAqL1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZChcImVsXCIsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGVsUmVmITogRWxlbWVudFJlZjxXZXhpb1dpZGdldEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgb25SZXNpemUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgZGV0YWlsID0gKGV2ZW50IGFzIEN1c3RvbUV2ZW50PHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfT4pLmRldGFpbDtcbiAgICBpZiAoZGV0YWlsKSB0aGlzLnJlc2l6ZS5lbWl0KGRldGFpbCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBvbk9wZW4gPSAoKSA9PiB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gIHByaXZhdGUgb25DbG9zZSA9ICgpID0+IHRoaXMuY2xvc2UuZW1pdCgpO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWxSZWY/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIC8vIFJ1bnRpbWUtaW5qZWN0IHRoZSB3aWRnZXQgcnVudGltZSBvbmNlLiBXZSBjYW4ndCBgaW1wb3J0YCBpdCBhdFxuICAgIC8vIGJ1aWxkIHRpbWUgKG5nLXBhY2thZ3IncyBzdHJpY3QgVFMgcmVqZWN0cyBiYXJlLUpTIGltcG9ydHMpLCBzb1xuICAgIC8vIHdlIGluamVjdCBhIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5gIGhlcmUgb24gZmlyc3QgbW91bnQuIFRoZVxuICAgIC8vIGJyb3dzZXIgY2FjaGVzIHRoZSBtb2R1bGUgYWZ0ZXIgZmlyc3QgbG9hZCwgc28gc3Vic2VxdWVudFxuICAgIC8vIGNvbXBvbmVudCBpbnN0YW5jZXMgc2tpcCB0aGUgbmV0d29yayByZXF1ZXN0IGVudGlyZWx5LiBDdXN0b21cbiAgICAvLyBlbGVtZW50IHVwZ3JhZGVzIHJldHJvYWN0aXZlbHkg4oCUIHRoZSBgPHdleGlvLXdpZGdldD5gIGVsZW1lbnRcbiAgICAvLyB3ZSBhbHJlYWR5IHJlbmRlcmVkIHdpbGwgXCJ1cGdyYWRlXCIgb25jZSB0aGUgc2NyaXB0IHJlZ2lzdGVyc1xuICAgIC8vIGl0cyBjbGFzcywgd2l0aCBubyByZS1yZW5kZXIgZmxpY2tlci5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgIHR5cGVvZiBjdXN0b21FbGVtZW50cyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgIWN1c3RvbUVsZW1lbnRzLmdldChcIndleGlvLXdpZGdldFwiKSAmJlxuICAgICAgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzY3JpcHRbZGF0YS13ZXhpby13aWRnZXQtcnVudGltZV1cIilcbiAgICApIHtcbiAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICBzY3JpcHQudHlwZSA9IFwibW9kdWxlXCI7XG4gICAgICBzY3JpcHQuc3JjID0gXCJodHRwczovL2Nkbi53ZXhpby5pby93aWRnZXQvd2lkZ2V0LmpzXCI7XG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZXhpby13aWRnZXQtcnVudGltZVwiLCBcIlwiKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpyZXNpemVcIiwgdGhpcy5vblJlc2l6ZSk7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIndleGlvOm9wZW5cIiwgdGhpcy5vbk9wZW4pO1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpjbG9zZVwiLCB0aGlzLm9uQ2xvc2UpO1xuICAgIC8vIGBwcmV2aWV3VGFiYCBpcyBhbiBvYmplY3QsIHNvIGl0IGdvZXMgdGhyb3VnaCB0aGUgZWxlbWVudCdzIEpTIHByb3BlcnR5LlxuICAgIGlmICh0aGlzLnByZXZpZXdUYWIpIGVsLnByZXZpZXdUYWIgPSB0aGlzLnByZXZpZXdUYWI7XG4gICAgaWYgKHRoaXMudXNlcikgZWwuaWRlbnRpZnk/Lih0aGlzLnVzZXIpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnByZXZpZXdUYWIgJiYgdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnByZXZpZXdUYWIgPSB0aGlzLnByZXZpZXdUYWI7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLnVzZXIgJiYgdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmlkZW50aWZ5Py4odGhpcy51c2VyID8/IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndleGlvOnJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2V4aW86b3BlblwiLCB0aGlzLm9uT3Blbik7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndleGlvOmNsb3NlXCIsIHRoaXMub25DbG9zZSk7XG4gIH1cbn1cbiJdfQ==