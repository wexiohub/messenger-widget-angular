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
    /** Host narrowing of the booking services (`booking.services`): only these service ids are offered. */
    bookingServices;
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
        // An array, so it too goes through the element's JS property.
        if (this.bookingServices)
            el.bookingServices = this.bookingServices;
        if (this.user)
            el.identify?.(this.user);
    }
    ngOnChanges(changes) {
        if (changes.previewTab && this.elRef?.nativeElement) {
            this.elRef.nativeElement.previewTab = this.previewTab;
        }
        if (changes.bookingServices && this.elRef?.nativeElement) {
            this.elRef.nativeElement.bookingServices = this.bookingServices;
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: WexioWidgetComponent, isStandalone: true, selector: "wexio-widget-ng", inputs: { publicKey: "publicKey", locale: "locale", mode: "mode", prefillName: "prefillName", prefillEmail: "prefillEmail", prefillPhone: "prefillPhone", user: "user", defaultOpen: "defaultOpen", open: "open", previewTab: "previewTab", bookingServices: "bookingServices" }, outputs: { resize: "resize", opened: "opened", close: "close" }, viewQueries: [{ propertyName: "elRef", first: true, predicate: ["el"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `<wexio-widget
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
            }], bookingServices: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2V4aW8td2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZXhpby13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULHNCQUFzQixFQUV0QixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBNkN2QixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLHdFQUF3RTtJQUMvRCxTQUFTLENBQVU7SUFDNUIscUVBQXFFO0lBQzVELE1BQU0sQ0FBVTtJQUN6QiwrREFBK0Q7SUFDdEQsSUFBSSxDQUFxQztJQUNsRCxrQ0FBa0M7SUFDekIsV0FBVyxDQUFVO0lBQzlCLGtDQUFrQztJQUN6QixZQUFZLENBQVU7SUFDL0Isa0NBQWtDO0lBQ3pCLFlBQVksQ0FBVTtJQUMvQix5REFBeUQ7SUFDaEQsSUFBSSxDQUEwQjtJQUN2Qyx5REFBeUQ7SUFDaEQsV0FBVyxDQUFXO0lBQy9CLHdHQUF3RztJQUMvRixJQUFJLENBQVc7SUFDeEIsMEVBQTBFO0lBQ2pFLFVBQVUsQ0FBb0I7SUFDdkMsdUdBQXVHO0lBQzlGLGVBQWUsQ0FBWTtJQUVwQyxnRUFBZ0U7SUFDdEQsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFxQyxDQUFDO0lBQ3pFLGtDQUFrQztJQUN4QixNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUM1QywrQ0FBK0M7SUFDckMsS0FBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFHM0MsS0FBSyxDQUFrQztJQUUvQixRQUFRLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtRQUNsQyxNQUFNLE1BQU0sR0FBSSxLQUF3RCxDQUFDLE1BQU0sQ0FBQztRQUNoRixJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUxQyxlQUFlO1FBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ2hCLGtFQUFrRTtRQUNsRSxrRUFBa0U7UUFDbEUsZ0VBQWdFO1FBQ2hFLDREQUE0RDtRQUM1RCxnRUFBZ0U7UUFDaEUsZ0VBQWdFO1FBQ2hFLCtEQUErRDtRQUMvRCx3Q0FBd0M7UUFDeEMsSUFDRSxPQUFPLFFBQVEsS0FBSyxXQUFXO1lBQy9CLE9BQU8sY0FBYyxLQUFLLFdBQVc7WUFDckMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztZQUNuQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsRUFDNUQsQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFDdkIsTUFBTSxDQUFDLEdBQUcsR0FBRyx1Q0FBdUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCwyRUFBMkU7UUFDM0UsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyRCw4REFBOEQ7UUFDOUQsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLEVBQUUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNwRSxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3hELENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN6RCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQzt3R0E5RlUsb0JBQW9COzRGQUFwQixvQkFBb0IsOGhCQVpyQjs7Ozs7Ozs7OzttQkFVTzs7NEZBRU4sb0JBQW9CO2tCQWhCaEMsU0FBUzttQkFBQztvQkFDVCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7OzttQkFVTztpQkFDbEI7OEJBR1UsU0FBUztzQkFBakIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0ksTUFBTTtzQkFBZixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxLQUFLO3NCQUFkLE1BQU07Z0JBR1AsS0FBSztzQkFESixTQUFTO3VCQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGBAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyYCDigJQgQW5ndWxhciBzdGFuZGFsb25lIGNvbXBvbmVudFxuICogd3JhcHBpbmcgdGhlIGA8d2V4aW8td2lkZ2V0PmAgY3VzdG9tIGVsZW1lbnQuXG4gKlxuICogRm9yd2FyZHMgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRvIGtlYmFiLWNhc2UgYXR0cmlidXRlcyBvbiB0aGVcbiAqIHVuZGVybHlpbmcgY3VzdG9tIGVsZW1lbnQgYW5kIHJlLWVtaXRzIGl0cyBgd2V4aW86cmVzaXplYCAvXG4gKiBgd2V4aW86Y2xvc2VgIEN1c3RvbUV2ZW50cyBhcyBBbmd1bGFyIGBAT3V0cHV0KClgIGBFdmVudEVtaXR0ZXJgcy5cbiAqXG4gKiBJbXBvcnRpbmcgdGhpcyBtb2R1bGUgc2lkZS1lZmZlY3QgcmVnaXN0ZXJzIGA8d2V4aW8td2lkZ2V0PmAgYXMgYVxuICogY3VzdG9tIGVsZW1lbnQg4oCUIG5vIHNlcGFyYXRlIHNjcmlwdCB0YWcgbmVlZGVkLlxuICpcbiAqIFN0YW5kYWxvbmUg4oCUIGRyb3AgaW50byBhbnkgQW5ndWxhciBjb21wb25lbnQncyBgaW1wb3J0c2A6XG4gKlxuICogICBpbXBvcnQgeyBXZXhpb1dpZGdldENvbXBvbmVudCB9IGZyb20gXCJAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyXCI7XG4gKlxuICogICBAQ29tcG9uZW50KHtcbiAqICAgICBzdGFuZGFsb25lOiB0cnVlLFxuICogICAgIGltcG9ydHM6IFtXZXhpb1dpZGdldENvbXBvbmVudF0sXG4gKiAgICAgdGVtcGxhdGU6IGA8d2V4aW8td2lkZ2V0LW5nIFtwdWJsaWNLZXldPVwicGtcIiAoY2xvc2UpPVwib25DbG9zZSgpXCIgLz5gLFxuICogICB9KVxuICogICBleHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHsgLi4uIH1cbiAqL1xuXG5pbXBvcnQge1xuICB0eXBlIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxcbiAgdHlwZSBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICB0eXBlIE9uQ2hhbmdlcyxcbiAgdHlwZSBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgdHlwZSBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKiBLbm93bi11c2VyIGlkZW50aXR5IHByb29mLiBQcm92aWRlIE9ORSBvZiBgZ29vZ2xlSWRUb2tlbmAsIGBqd3RgLFxuICogIG9yIHRoZSBsZWdhY3kgYHVzZXJJZGAgKyBgdXNlckhhc2hgIHBhaXIuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpc2l0b3JJZGVudGl0eSB7XG4gIGdvb2dsZUlkVG9rZW4/OiBzdHJpbmc7XG4gIGp3dD86IHN0cmluZztcbiAgdXNlcklkPzogc3RyaW5nO1xuICB1c2VySGFzaD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgZW1haWw/OiBzdHJpbmc7XG4gIHBob25lPzogc3RyaW5nO1xuICBhdHRyaWJ1dGVzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG5cbi8qKiBOYXZpZ2F0aW9uIHJlcXVlc3Q6IGdvIHRvIGEgdGFiIChhbmQgb3B0aW9uYWxseSBhIGhlbHAgYXJ0aWNsZSAvIG5ld3MgcG9zdClcbiAqICB3aXRob3V0IGEgcmVtb3VudCBhbmQgb3BlbiB0aGUgcGFuZWwuIEEgbmV3IGBub25jZWAgcmUtaXNzdWVzIHRoZSByZXF1ZXN0LiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3VGFiU2lnbmFsIHtcbiAgdGFiOiBcImhvbWVcIiB8IFwibWVzc2FnZXNcIiB8IFwiaGVscFwiIHwgXCJuZXdzXCIgfCBcInByb2ZpbGVcIjtcbiAgbm9uY2U6IG51bWJlcjtcbiAgYXJ0aWNsZT86IHsga2luZDogXCJoZWxwXCI7IHNsdWc6IHN0cmluZyB9IHwgeyBraW5kOiBcIm5ld3NcIjsgaWQ6IHN0cmluZyB9O1xufVxuXG5pbnRlcmZhY2UgV2V4aW9XaWRnZXRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBpZGVudGlmeSh1c2VyOiBWaXNpdG9ySWRlbnRpdHkgfCBudWxsKTogdm9pZDtcbiAgcHJldmlld1RhYj86IFByZXZpZXdUYWJTaWduYWw7XG4gIGJvb2tpbmdTZXJ2aWNlcz86IHN0cmluZ1tdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6IFwid2V4aW8td2lkZ2V0LW5nXCIsXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXSxcbiAgdGVtcGxhdGU6IGA8d2V4aW8td2lkZ2V0XG4gICAgI2VsXG4gICAgW2F0dHIucHVibGljLWtleV09XCJwdWJsaWNLZXkgPz8gbnVsbFwiXG4gICAgW2F0dHIubG9jYWxlXT1cImxvY2FsZSA/PyBudWxsXCJcbiAgICBbYXR0ci5tb2RlXT1cIm1vZGUgPz8gbnVsbFwiXG4gICAgW2F0dHIucHJlZmlsbC1uYW1lXT1cInByZWZpbGxOYW1lID8/IG51bGxcIlxuICAgIFthdHRyLnByZWZpbGwtZW1haWxdPVwicHJlZmlsbEVtYWlsID8/IG51bGxcIlxuICAgIFthdHRyLnByZWZpbGwtcGhvbmVdPVwicHJlZmlsbFBob25lID8/IG51bGxcIlxuICAgIFthdHRyLmRlZmF1bHQtb3Blbl09XCJkZWZhdWx0T3BlbiA9PSBudWxsID8gbnVsbCA6IGRlZmF1bHRPcGVuID8gJ3RydWUnIDogJ2ZhbHNlJ1wiXG4gICAgW2F0dHIub3Blbl09XCJvcGVuID09IG51bGwgPyBudWxsIDogb3BlbiA/ICd0cnVlJyA6ICdmYWxzZSdcIlxuICA+PC93ZXhpby13aWRnZXQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgV2V4aW9XaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBXZXhpbyBpbnRlZ3JhdGlvbiBwdWJsaWMga2V5IChgcGtfbGl2ZV8uLi5gKS4gT21pdCBmb3IgZGVtbyBtb2RlLiAqL1xuICBASW5wdXQoKSBwdWJsaWNLZXk/OiBzdHJpbmc7XG4gIC8qKiBVSSBsb2NhbGUgKEJDUC00NykuIE92ZXJyaWRlcyB0aGUgb3BlcmF0b3IncyBgbG9jYWxlU3RyYXRlZ3lgLiAqL1xuICBASW5wdXQoKSBsb2NhbGU/OiBzdHJpbmc7XG4gIC8qKiBGb3JjZSB3aWRnZXQgbW9kZS4gUHVibGljIGNvbnN1bWVycyBzaG91bGQgbm90IHNldCB0aGlzLiAqL1xuICBASW5wdXQoKSBtb2RlPzogXCJwcm9kdWN0aW9uXCIgfCBcInByZXZpZXdcIiB8IFwiZGVtb1wiO1xuICAvKiogVW52ZXJpZmllZCBwcmVjaGF0IHByZWZpbGwuICovXG4gIEBJbnB1dCgpIHByZWZpbGxOYW1lPzogc3RyaW5nO1xuICAvKiogVW52ZXJpZmllZCBwcmVjaGF0IHByZWZpbGwuICovXG4gIEBJbnB1dCgpIHByZWZpbGxFbWFpbD86IHN0cmluZztcbiAgLyoqIFVudmVyaWZpZWQgcHJlY2hhdCBwcmVmaWxsLiAqL1xuICBASW5wdXQoKSBwcmVmaWxsUGhvbmU/OiBzdHJpbmc7XG4gIC8qKiBLbm93bi11c2VyIGlkZW50aXR5IHByb29mLiBQYXNzIGBudWxsYCB0byBsb2cgb3V0LiAqL1xuICBASW5wdXQoKSB1c2VyPzogVmlzaXRvcklkZW50aXR5IHwgbnVsbDtcbiAgLyoqIE9wZW4gdGhlIHBhbmVsIG9uIG1vdW50ICh1bmNvbnRyb2xsZWQgYWZ0ZXJ3YXJkcykuICovXG4gIEBJbnB1dCgpIGRlZmF1bHRPcGVuPzogYm9vbGVhbjtcbiAgLyoqIENvbnRyb2xsZWQgb3BlbiBzdGF0ZTsga2VlcCBpdCBpbiBzeW5jIGZyb20gYChvcGVuZWQpYCAvIGAoY2xvc2UpYC4gTGVhdmUgdW5zZXQgZm9yIHVuY29udHJvbGxlZC4gKi9cbiAgQElucHV0KCkgb3Blbj86IGJvb2xlYW47XG4gIC8qKiBOYXZpZ2F0ZSB0byBhIHRhYiAvIGFydGljbGUgd2l0aG91dCBhIHJlbW91bnQgKGFuZCBvcGVuIHRoZSBwYW5lbCkuICovXG4gIEBJbnB1dCgpIHByZXZpZXdUYWI/OiBQcmV2aWV3VGFiU2lnbmFsO1xuICAvKiogSG9zdCBuYXJyb3dpbmcgb2YgdGhlIGJvb2tpbmcgc2VydmljZXMgKGBib29raW5nLnNlcnZpY2VzYCk6IG9ubHkgdGhlc2Ugc2VydmljZSBpZHMgYXJlIG9mZmVyZWQuICovXG4gIEBJbnB1dCgpIGJvb2tpbmdTZXJ2aWNlcz86IHN0cmluZ1tdO1xuXG4gIC8qKiBGaXJlcyBldmVyeSB0aW1lIHBhbmVsIGRpbWVuc2lvbnMgY2hhbmdlIChvcGVuIOKGlCBjbG9zZWQpLiAqL1xuICBAT3V0cHV0KCkgcmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcjx7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0+KCk7XG4gIC8qKiBGaXJlcyB3aGVuIHRoZSBwYW5lbCBvcGVucy4gKi9cbiAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgLyoqIEZpcmVzIHdoZW4gdGhlIHZpc2l0b3IgY2xvc2VzIHRoZSBwYW5lbC4gKi9cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBWaWV3Q2hpbGQoXCJlbFwiLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBlbFJlZiE6IEVsZW1lbnRSZWY8V2V4aW9XaWRnZXRFbGVtZW50PjtcblxuICBwcml2YXRlIG9uUmVzaXplID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IGRldGFpbCA9IChldmVudCBhcyBDdXN0b21FdmVudDx7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH0+KS5kZXRhaWw7XG4gICAgaWYgKGRldGFpbCkgdGhpcy5yZXNpemUuZW1pdChkZXRhaWwpO1xuICB9O1xuXG4gIHByaXZhdGUgb25PcGVuID0gKCkgPT4gdGhpcy5vcGVuZWQuZW1pdCgpO1xuICBwcml2YXRlIG9uQ2xvc2UgPSAoKSA9PiB0aGlzLmNsb3NlLmVtaXQoKTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsUmVmPy5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICAvLyBSdW50aW1lLWluamVjdCB0aGUgd2lkZ2V0IHJ1bnRpbWUgb25jZS4gV2UgY2FuJ3QgYGltcG9ydGAgaXQgYXRcbiAgICAvLyBidWlsZCB0aW1lIChuZy1wYWNrYWdyJ3Mgc3RyaWN0IFRTIHJlamVjdHMgYmFyZS1KUyBpbXBvcnRzKSwgc29cbiAgICAvLyB3ZSBpbmplY3QgYSBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+YCBoZXJlIG9uIGZpcnN0IG1vdW50LiBUaGVcbiAgICAvLyBicm93c2VyIGNhY2hlcyB0aGUgbW9kdWxlIGFmdGVyIGZpcnN0IGxvYWQsIHNvIHN1YnNlcXVlbnRcbiAgICAvLyBjb21wb25lbnQgaW5zdGFuY2VzIHNraXAgdGhlIG5ldHdvcmsgcmVxdWVzdCBlbnRpcmVseS4gQ3VzdG9tXG4gICAgLy8gZWxlbWVudCB1cGdyYWRlcyByZXRyb2FjdGl2ZWx5IOKAlCB0aGUgYDx3ZXhpby13aWRnZXQ+YCBlbGVtZW50XG4gICAgLy8gd2UgYWxyZWFkeSByZW5kZXJlZCB3aWxsIFwidXBncmFkZVwiIG9uY2UgdGhlIHNjcmlwdCByZWdpc3RlcnNcbiAgICAvLyBpdHMgY2xhc3MsIHdpdGggbm8gcmUtcmVuZGVyIGZsaWNrZXIuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICB0eXBlb2YgY3VzdG9tRWxlbWVudHMgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICFjdXN0b21FbGVtZW50cy5nZXQoXCJ3ZXhpby13aWRnZXRcIikgJiZcbiAgICAgICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0W2RhdGEtd2V4aW8td2lkZ2V0LXJ1bnRpbWVdXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgc2NyaXB0LnR5cGUgPSBcIm1vZHVsZVwiO1xuICAgICAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly9jZG4ud2V4aW8uaW8vd2lkZ2V0L3dpZGdldC5qc1wiO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2V4aW8td2lkZ2V0LXJ1bnRpbWVcIiwgXCJcIik7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwid2V4aW86cmVzaXplXCIsIHRoaXMub25SZXNpemUpO1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpvcGVuXCIsIHRoaXMub25PcGVuKTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwid2V4aW86Y2xvc2VcIiwgdGhpcy5vbkNsb3NlKTtcbiAgICAvLyBgcHJldmlld1RhYmAgaXMgYW4gb2JqZWN0LCBzbyBpdCBnb2VzIHRocm91Z2ggdGhlIGVsZW1lbnQncyBKUyBwcm9wZXJ0eS5cbiAgICBpZiAodGhpcy5wcmV2aWV3VGFiKSBlbC5wcmV2aWV3VGFiID0gdGhpcy5wcmV2aWV3VGFiO1xuICAgIC8vIEFuIGFycmF5LCBzbyBpdCB0b28gZ29lcyB0aHJvdWdoIHRoZSBlbGVtZW50J3MgSlMgcHJvcGVydHkuXG4gICAgaWYgKHRoaXMuYm9va2luZ1NlcnZpY2VzKSBlbC5ib29raW5nU2VydmljZXMgPSB0aGlzLmJvb2tpbmdTZXJ2aWNlcztcbiAgICBpZiAodGhpcy51c2VyKSBlbC5pZGVudGlmeT8uKHRoaXMudXNlcik7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMucHJldmlld1RhYiAmJiB0aGlzLmVsUmVmPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucHJldmlld1RhYiA9IHRoaXMucHJldmlld1RhYjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYm9va2luZ1NlcnZpY2VzICYmIHRoaXMuZWxSZWY/Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5ib29raW5nU2VydmljZXMgPSB0aGlzLmJvb2tpbmdTZXJ2aWNlcztcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMudXNlciAmJiB0aGlzLmVsUmVmPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuaWRlbnRpZnk/Lih0aGlzLnVzZXIgPz8gbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsUmVmPy5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2V4aW86cmVzaXplXCIsIHRoaXMub25SZXNpemUpO1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpvcGVuXCIsIHRoaXMub25PcGVuKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2V4aW86Y2xvc2VcIiwgdGhpcy5vbkNsb3NlKTtcbiAgfVxufVxuIl19