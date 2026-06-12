# Welcome to @wexio/messenger-widget-angular 👋

[![Version](https://img.shields.io/npm/v/@wexio/messenger-widget-angular.svg)](https://www.npmjs.com/package/@wexio/messenger-widget-angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Documentation](https://img.shields.io/badge/docs-wexio.io-blue.svg)](https://learn.wexio.io/docs/web-widget)

Native Angular standalone component for the [Wexio](https://wexio.io) web messenger. Thin wrapper around the underlying `<wexio-widget>` custom element — same `WidgetShell` runtime as the script-injected iframe and the React component. Same chat, same visitor identity, same backend; the only difference is **where the Angular tree mounts**.

🏠 [Website](https://wexio.io)
📚 [Developer Docs](https://learn.wexio.io/docs/web-widget)

## 📂 Description

- [Installation](#installation)
- [Quick start](#quick-start)
- [Identifying users](#identifying-users)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Types](#types)
- [SSR (Angular Universal)](#ssr-angular-universal)
- [Browser support](#browser-support)
- [Author](#author)
- [License](#-license)

## Installation

```bash
yarn add @wexio/messenger-widget-angular
```

or

```bash
npm install @wexio/messenger-widget-angular
```

Peer dependencies: `@angular/core >= 16`, `@angular/common >= 16`. The widget uses the host's Angular runtime.

## Quick start

```ts
// app.component.ts
import { Component } from "@angular/core";
import { WexioWidgetComponent } from "@wexio/messenger-widget-angular";

@Component({
  standalone: true,
  imports: [WexioWidgetComponent],
  selector: "app-root",
  template: `
    <main>
      <!-- your app -->
      <wexio-widget-ng publicKey="pk_live_..." />
    </main>
  `,
})
export class AppComponent {}
```

That's it — the widget mounts a floating launcher, handles its own theme/locale/state, and the operator dashboard sees the visitor immediately.

> **Selector** — the component selector is `wexio-widget-ng` (suffixed to avoid clashing with the underlying `<wexio-widget>` custom element it renders).

## Identifying users

Pass a verified `user` input to log a known visitor in. Provide ONE proof — a Google FedCM `id_token`, a host-signed `jwt`, or the legacy `userId` + `userHash` HMAC pair:

```ts
import { Component } from "@angular/core";
import {
  VisitorIdentity,
  WexioWidgetComponent,
} from "@wexio/messenger-widget-angular";

@Component({
  standalone: true,
  imports: [WexioWidgetComponent],
  selector: "app-root",
  template: `<wexio-widget-ng publicKey="pk_live_..." [user]="user" />`,
})
export class AppComponent {
  user: VisitorIdentity = {
    jwt: serverSignedJwt, // host-signed identity token (recommended)
    name: "Ada Lovelace",
    email: "ada@example.com",
  };
}
```

> **Reactive identity** — assign a new object (or `null`) to `user` to re-fire the handshake / log out. The component's `ngOnChanges` watches it.

## Inputs

| Input          | Type                          | Description                                                                       |
| -------------- | ----------------------------- | --------------------------------------------------------------------------------- |
| `publicKey`    | `string`                      | Wexio integration public key (`pk_live_...`). Omit for demo mode.                 |
| `locale`       | `string`                      | UI locale (BCP-47). Overrides the operator's `localeStrategy`.                    |
| `prefillName`  | `string`                      | Unverified prechat prefill.                                                        |
| `prefillEmail` | `string`                      | Unverified prechat prefill.                                                        |
| `prefillPhone` | `string`                      | Unverified prechat prefill.                                                        |
| `user`         | `VisitorIdentity \| null`     | Known-user identity proof. Pass `null` to log out.                                |

## Outputs

| Output    | Payload                                | When                                                |
| --------- | -------------------------------------- | --------------------------------------------------- |
| `resize`  | `{ width: number; height: number }`    | Panel dimensions changed (open ↔ closed). |
| `close`   | `void`                                  | Visitor closed the panel.                            |

```ts
template: `
  <wexio-widget-ng
    publicKey="pk_live_..."
    (resize)="onResize($event)"
    (close)="onClose()"
  />
`;

// ...
onResize(size: { width: number; height: number }) {
  console.log(size.width, size.height);
}
onClose() {
  console.log("visitor closed the panel");
}
```

## Types

### VisitorIdentity

```ts
interface VisitorIdentity {
  googleIdToken?: string;  // Google FedCM id_token (preferred)
  jwt?: string;            // Host-signed JWT
  userId?: string;         // Legacy HMAC pair…
  userHash?: string;       // …(HMAC-SHA256(userId, integrationSecret))
  name?: string;
  email?: string;
  phone?: string;
  attributes?: Record<string, unknown>;
}
```

## SSR (Angular Universal)

The wrapper renders an empty `<wexio-widget>` element on the server. The actual widget initialises on first client-side mount (`ngAfterViewInit`). No special handling is needed for Angular Universal — the custom element runs only in the browser.

## Browser support

Modern evergreen browsers — anything that supports Shadow DOM and ES2020. Internet Explorer is not supported.

## Use with other frameworks

The underlying widget runtime is a Web Component, so it works in any modern framework:

- [`@wexio/messenger-widget-react`](https://www.npmjs.com/package/@wexio/messenger-widget-react) — React
- [`@wexio/messenger-widget-vue`](https://www.npmjs.com/package/@wexio/messenger-widget-vue) — Vue 3
- [`@wexio/messenger-widget-ember`](https://www.npmjs.com/package/@wexio/messenger-widget-ember) — Ember

## Author

👤 **Wexio** ([https://wexio.io](https://wexio.io))

## Show your support

Give a ⭐️ if this package helped you!

## 📝 License

This project is [MIT](./LICENSE) licensed.

---

_Created with ❤️ by [Wexio](https://wexio.io)_
