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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2V4aW8td2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZXhpby13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULHNCQUFzQixFQUV0QixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBaUN2QixNQUFNLE9BQU8sb0JBQW9CO0lBRy9CLHdFQUF3RTtJQUMvRCxTQUFTLENBQVU7SUFDNUIscUVBQXFFO0lBQzVELE1BQU0sQ0FBVTtJQUN6QiwrREFBK0Q7SUFDdEQsSUFBSSxDQUFxQztJQUNsRCxrQ0FBa0M7SUFDekIsV0FBVyxDQUFVO0lBQzlCLGtDQUFrQztJQUN6QixZQUFZLENBQVU7SUFDL0Isa0NBQWtDO0lBQ3pCLFlBQVksQ0FBVTtJQUMvQix5REFBeUQ7SUFDaEQsSUFBSSxDQUEwQjtJQUV2QyxnRUFBZ0U7SUFDdEQsTUFBTSxHQUFHLElBQUksWUFBWSxFQUFxQyxDQUFDO0lBQ3pFLCtDQUErQztJQUNyQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUczQyxLQUFLLENBQWtDO0lBRS9CLFFBQVEsR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFO1FBQ2xDLE1BQU0sTUFBTSxHQUFJLEtBQXdEO2FBQ3JFLE1BQU0sQ0FBQztRQUNWLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUVNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFDLGVBQWU7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQztRQUNyQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsa0VBQWtFO1FBQ2xFLGtFQUFrRTtRQUNsRSxnRUFBZ0U7UUFDaEUsNERBQTREO1FBQzVELGdFQUFnRTtRQUNoRSxnRUFBZ0U7UUFDaEUsK0RBQStEO1FBQy9ELHdDQUF3QztRQUN4QyxJQUNFLE9BQU8sUUFBUSxLQUFLLFdBQVc7WUFDL0IsT0FBTyxjQUFjLEtBQUssV0FBVztZQUNyQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQ25DLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUM1RCxDQUFDO1lBQ0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN2QixNQUFNLENBQUMsR0FBRyxHQUFHLHVDQUF1QyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxZQUFZLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3pELENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxFQUFFO1lBQUUsT0FBTztRQUNoQixFQUFFLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO3dHQTFFVSxvQkFBb0I7NEZBQXBCLG9CQUFvQixvYUFWckI7Ozs7Ozs7O21CQVFPOzs0RkFFTixvQkFBb0I7a0JBZGhDLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7O21CQVFPO2lCQUNsQjs4QkFLVSxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUdJLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxLQUFLO3NCQUFkLE1BQU07Z0JBR1AsS0FBSztzQkFESixTQUFTO3VCQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGBAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyYCDigJQgQW5ndWxhciBzdGFuZGFsb25lIGNvbXBvbmVudFxuICogd3JhcHBpbmcgdGhlIGA8d2V4aW8td2lkZ2V0PmAgY3VzdG9tIGVsZW1lbnQuXG4gKlxuICogRm9yd2FyZHMgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRvIGtlYmFiLWNhc2UgYXR0cmlidXRlcyBvbiB0aGVcbiAqIHVuZGVybHlpbmcgY3VzdG9tIGVsZW1lbnQgYW5kIHJlLWVtaXRzIGl0cyBgd2V4aW86cmVzaXplYCAvXG4gKiBgd2V4aW86Y2xvc2VgIEN1c3RvbUV2ZW50cyBhcyBBbmd1bGFyIGBAT3V0cHV0KClgIGBFdmVudEVtaXR0ZXJgcy5cbiAqXG4gKiBJbXBvcnRpbmcgdGhpcyBtb2R1bGUgc2lkZS1lZmZlY3QgcmVnaXN0ZXJzIGA8d2V4aW8td2lkZ2V0PmAgYXMgYVxuICogY3VzdG9tIGVsZW1lbnQg4oCUIG5vIHNlcGFyYXRlIHNjcmlwdCB0YWcgbmVlZGVkLlxuICpcbiAqIFN0YW5kYWxvbmUg4oCUIGRyb3AgaW50byBhbnkgQW5ndWxhciBjb21wb25lbnQncyBgaW1wb3J0c2A6XG4gKlxuICogICBpbXBvcnQgeyBXZXhpb1dpZGdldENvbXBvbmVudCB9IGZyb20gXCJAd2V4aW8vbWVzc2VuZ2VyLXdpZGdldC1hbmd1bGFyXCI7XG4gKlxuICogICBAQ29tcG9uZW50KHtcbiAqICAgICBzdGFuZGFsb25lOiB0cnVlLFxuICogICAgIGltcG9ydHM6IFtXZXhpb1dpZGdldENvbXBvbmVudF0sXG4gKiAgICAgdGVtcGxhdGU6IGA8d2V4aW8td2lkZ2V0LW5nIFtwdWJsaWNLZXldPVwicGtcIiAoY2xvc2UpPVwib25DbG9zZSgpXCIgLz5gLFxuICogICB9KVxuICogICBleHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHsgLi4uIH1cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqIEtub3duLXVzZXIgaWRlbnRpdHkgcHJvb2YuIFByb3ZpZGUgT05FIG9mIGBnb29nbGVJZFRva2VuYCwgYGp3dGAsXG4gKiAgb3IgdGhlIGxlZ2FjeSBgdXNlcklkYCArIGB1c2VySGFzaGAgcGFpci4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlzaXRvcklkZW50aXR5IHtcbiAgZ29vZ2xlSWRUb2tlbj86IHN0cmluZztcbiAgand0Pzogc3RyaW5nO1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIHVzZXJIYXNoPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBlbWFpbD86IHN0cmluZztcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIGF0dHJpYnV0ZXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn1cblxuaW50ZXJmYWNlIFdleGlvV2lkZ2V0RWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgaWRlbnRpZnkodXNlcjogVmlzaXRvcklkZW50aXR5IHwgbnVsbCk6IHZvaWQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogXCJ3ZXhpby13aWRnZXQtbmdcIixcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxuICB0ZW1wbGF0ZTogYDx3ZXhpby13aWRnZXRcbiAgICAjZWxcbiAgICBbYXR0ci5wdWJsaWMta2V5XT1cInB1YmxpY0tleSA/PyBudWxsXCJcbiAgICBbYXR0ci5sb2NhbGVdPVwibG9jYWxlID8/IG51bGxcIlxuICAgIFthdHRyLm1vZGVdPVwibW9kZSA/PyBudWxsXCJcbiAgICBbYXR0ci5wcmVmaWxsLW5hbWVdPVwicHJlZmlsbE5hbWUgPz8gbnVsbFwiXG4gICAgW2F0dHIucHJlZmlsbC1lbWFpbF09XCJwcmVmaWxsRW1haWwgPz8gbnVsbFwiXG4gICAgW2F0dHIucHJlZmlsbC1waG9uZV09XCJwcmVmaWxsUGhvbmUgPz8gbnVsbFwiXG4gID48L3dleGlvLXdpZGdldD5gLFxufSlcbmV4cG9ydCBjbGFzcyBXZXhpb1dpZGdldENvbXBvbmVudFxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95XG57XG4gIC8qKiBXZXhpbyBpbnRlZ3JhdGlvbiBwdWJsaWMga2V5IChgcGtfbGl2ZV8uLi5gKS4gT21pdCBmb3IgZGVtbyBtb2RlLiAqL1xuICBASW5wdXQoKSBwdWJsaWNLZXk/OiBzdHJpbmc7XG4gIC8qKiBVSSBsb2NhbGUgKEJDUC00NykuIE92ZXJyaWRlcyB0aGUgb3BlcmF0b3IncyBgbG9jYWxlU3RyYXRlZ3lgLiAqL1xuICBASW5wdXQoKSBsb2NhbGU/OiBzdHJpbmc7XG4gIC8qKiBGb3JjZSB3aWRnZXQgbW9kZS4gUHVibGljIGNvbnN1bWVycyBzaG91bGQgbm90IHNldCB0aGlzLiAqL1xuICBASW5wdXQoKSBtb2RlPzogXCJwcm9kdWN0aW9uXCIgfCBcInByZXZpZXdcIiB8IFwiZGVtb1wiO1xuICAvKiogVW52ZXJpZmllZCBwcmVjaGF0IHByZWZpbGwuICovXG4gIEBJbnB1dCgpIHByZWZpbGxOYW1lPzogc3RyaW5nO1xuICAvKiogVW52ZXJpZmllZCBwcmVjaGF0IHByZWZpbGwuICovXG4gIEBJbnB1dCgpIHByZWZpbGxFbWFpbD86IHN0cmluZztcbiAgLyoqIFVudmVyaWZpZWQgcHJlY2hhdCBwcmVmaWxsLiAqL1xuICBASW5wdXQoKSBwcmVmaWxsUGhvbmU/OiBzdHJpbmc7XG4gIC8qKiBLbm93bi11c2VyIGlkZW50aXR5IHByb29mLiBQYXNzIGBudWxsYCB0byBsb2cgb3V0LiAqL1xuICBASW5wdXQoKSB1c2VyPzogVmlzaXRvcklkZW50aXR5IHwgbnVsbDtcblxuICAvKiogRmlyZXMgZXZlcnkgdGltZSBwYW5lbCBkaW1lbnNpb25zIGNoYW5nZSAob3BlbiDihpQgY2xvc2VkKS4gKi9cbiAgQE91dHB1dCgpIHJlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9PigpO1xuICAvKiogRmlyZXMgd2hlbiB0aGUgdmlzaXRvciBjbG9zZXMgdGhlIHBhbmVsLiAqL1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZChcImVsXCIsIHsgc3RhdGljOiB0cnVlIH0pXG4gIGVsUmVmITogRWxlbWVudFJlZjxXZXhpb1dpZGdldEVsZW1lbnQ+O1xuXG4gIHByaXZhdGUgb25SZXNpemUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgZGV0YWlsID0gKGV2ZW50IGFzIEN1c3RvbUV2ZW50PHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfT4pXG4gICAgICAuZGV0YWlsO1xuICAgIGlmIChkZXRhaWwpIHRoaXMucmVzaXplLmVtaXQoZGV0YWlsKTtcbiAgfTtcblxuICBwcml2YXRlIG9uQ2xvc2UgPSAoKSA9PiB0aGlzLmNsb3NlLmVtaXQoKTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsUmVmPy5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICAvLyBSdW50aW1lLWluamVjdCB0aGUgd2lkZ2V0IHJ1bnRpbWUgb25jZS4gV2UgY2FuJ3QgYGltcG9ydGAgaXQgYXRcbiAgICAvLyBidWlsZCB0aW1lIChuZy1wYWNrYWdyJ3Mgc3RyaWN0IFRTIHJlamVjdHMgYmFyZS1KUyBpbXBvcnRzKSwgc29cbiAgICAvLyB3ZSBpbmplY3QgYSBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+YCBoZXJlIG9uIGZpcnN0IG1vdW50LiBUaGVcbiAgICAvLyBicm93c2VyIGNhY2hlcyB0aGUgbW9kdWxlIGFmdGVyIGZpcnN0IGxvYWQsIHNvIHN1YnNlcXVlbnRcbiAgICAvLyBjb21wb25lbnQgaW5zdGFuY2VzIHNraXAgdGhlIG5ldHdvcmsgcmVxdWVzdCBlbnRpcmVseS4gQ3VzdG9tXG4gICAgLy8gZWxlbWVudCB1cGdyYWRlcyByZXRyb2FjdGl2ZWx5IOKAlCB0aGUgYDx3ZXhpby13aWRnZXQ+YCBlbGVtZW50XG4gICAgLy8gd2UgYWxyZWFkeSByZW5kZXJlZCB3aWxsIFwidXBncmFkZVwiIG9uY2UgdGhlIHNjcmlwdCByZWdpc3RlcnNcbiAgICAvLyBpdHMgY2xhc3MsIHdpdGggbm8gcmUtcmVuZGVyIGZsaWNrZXIuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICB0eXBlb2YgY3VzdG9tRWxlbWVudHMgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICFjdXN0b21FbGVtZW50cy5nZXQoXCJ3ZXhpby13aWRnZXRcIikgJiZcbiAgICAgICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0W2RhdGEtd2V4aW8td2lkZ2V0LXJ1bnRpbWVdXCIpXG4gICAgKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgc2NyaXB0LnR5cGUgPSBcIm1vZHVsZVwiO1xuICAgICAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly9jZG4ud2V4aW8uaW8vd2lkZ2V0L3dpZGdldC5qc1wiO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2V4aW8td2lkZ2V0LXJ1bnRpbWVcIiwgXCJcIik7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwid2V4aW86cmVzaXplXCIsIHRoaXMub25SZXNpemUpO1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZXhpbzpjbG9zZVwiLCB0aGlzLm9uQ2xvc2UpO1xuICAgIGlmICh0aGlzLnVzZXIpIGVsLmlkZW50aWZ5Py4odGhpcy51c2VyKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1tcInVzZXJcIl0gJiYgdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmlkZW50aWZ5Py4odGhpcy51c2VyID8/IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbFJlZj8ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndleGlvOnJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2V4aW86Y2xvc2VcIiwgdGhpcy5vbkNsb3NlKTtcbiAgfVxufVxuIl19