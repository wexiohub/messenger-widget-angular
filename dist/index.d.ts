import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";

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

/**
 * Standalone Angular component wrapping the `<wexio-widget>` web
 * component. Drop into any component's `imports`:
 *
 *   @Component({
 *     standalone: true,
 *     imports: [WexioWidgetComponent],
 *     template: `<wexio-widget-ng [publicKey]="pk" (close)="onClose()" />`,
 *   })
 *   export class AppComponent { ... }
 */
export declare class WexioWidgetComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
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
  resize: EventEmitter<{ width: number; height: number }>;
  /** Fires when the visitor closes the panel. */
  close: EventEmitter<void>;

  elRef: ElementRef<HTMLElement>;

  ngAfterViewInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
}
