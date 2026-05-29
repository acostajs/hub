# Hub User Interface Portal

This is the student-facing Single Sign-On (SSO) and launch portal for the Student Hub. Built as a high-performance **React** Single-Page Application (SPA) running on **Bun**, it provides a streamlined login, registration, and service launcher dashboard interface.

---

## 🛠️ Technology Stack & Styling Library

* **Runtime & Bundler**: **Bun** for rapid dependency installs, HMR development servers, and quick build generation.
* **Component Engine**: **React 19** + **TypeScript** enforcing strict type definitions across all contexts.
* **Design System**: **Tailwind CSS v4** implementing a strict high-contrast monochromatic theme.
* **Code Gatekeeper**: **Biome** for lightning-fast unified formatting, linting, and quality check enforcement.

---

## 📂 Frontend Architecture Topography

```text
frontend/
├── src/
│   ├── components/       # Globally shared layout containers and UI blocks
│   ├── context/          # Global context layers (LanguageContext)
│   ├── pages/            # Domain-driven, self-contained workspaces
│   │   ├── Portal/       # The Student Service Launcher workspace
│   │   │   ├── Portal.tsx
│   │   │   └── Portal.styles.ts
│   │   ├── Login/        # User authentication form screen
│   │   │   ├── Login.tsx
│   │   │   └── Login.styles.ts
│   │   └── Register/     # New student onboarding account screen
│   │       ├── Register.tsx
│   │       └── Register.styles.ts
│   ├── styles/
│   │   └── global.css    # Core typography scale and monochromatic tokens
│   ├── utils/
│   │   └── cookie.ts     # Session check and deletion helpers
│   ├── App.locales.ts    # Global localization maps
│   ├── App.tsx           # Session Interception router & theme controllers
│   ├── index.html        # SPA root element
│   └── main.tsx          # Base app mount & entry point
├── package.json          # Node manifest
├── biome.json            # Biome formatting and lint specifications
└── tsconfig.json         # TypeScript configuration
```

---

## 🎨 Monochromatic Theme System & Styling Constraints

The Hub enforces a strict, high-contrast, black-and-white theme system. Accent colors or custom gradients are prohibited.

### Theme Modes
* **Light Theme**: Absolute white backgrounds (`#FFFFFF`), solid black typography, thick 1px solid black borders.
* **Dark Theme**: Absolute black backgrounds (`#000000`), solid white typography, thick 1px solid white borders.

### Dynamic Theme Matching
Theme configuration is fully automated and driven by the user's system preferences using the CSS media query `prefers-color-scheme`. Redundant hardcoded toggles or theme-state inputs are avoided.

### Layout Constraints
* **Ban on Arbitrary Inline Sizing**: Inline pixel definitions (e.g. `p-[13px]`, `w-[420px]`) are banned. Sizing and borders rely exclusively on semantic tokens configured inside `src/index.css`.
* **Component Abstractions**: Structural elements must utilize unified global utility abstractions (e.g. `.card-surface`, `.btn-primary`, `.input-primary`).
* **Semantic Typography**: Typography is restricted to semantic scales: `.text-heading-lg` (titles), `.text-heading-md` (sub-headings/cards), and `.text-body` (descriptions and input labels).

---

## 🌐 Native Co-located Internationalization (i18n)

* **Prose Isolation**: Raw prose strings are banned in components. Every text fragment is loaded dynamically from co-located typesafe translation tables (`*.locales.ts`) inside their respective page domains.
* **Supported Languages**: English (`en`), French (`fr`), and Spanish (`es`).
* **OS Language Detection**: The frontend reads preferred system configurations natively via `navigator.language` at initial startup to apply the correct language mapping seamlessly.

---

## 🧹 Clean Code Laws & Strict Boundaries

To ensure codebase longevity and compliance with pre-commit git checks:

1. **Strict Type Safety**: The usage of `any` is strictly prohibited. If dynamic shapes exist, they are declared as `unknown` and parsed with exhaustive guards.
2. **Types Over Interfaces**: Never use the `interface` keyword. All structural shapes and component properties must be declared via the `type` keyword.
3. **Functions Over Arrow Constants**: All components and functional helpers must be declared using the traditional `function` keyword. Do not assign arrow functions to constants.
4. **Co-location Rule**: Feature-specific styles, localized text keys, and local components must live directly inside that feature's directory.
5. **Size Limit**: No single file should exceed 200 lines of code.

---

## 🔑 Single Sign-On (SSO) Session Interception

On initial startup, `App.tsx` performs a clean session validation check:
* It inspects if the secure cookie `hub_session` is present in the browser cookie container.
* If the cookie is present, the app intercepts standard routing and immediately forwards the student straight to the launcher panel (`portal`), bypassing register/login.

---

## 🚀 Quick Start & Operations

Ensure you have [Bun](https://bun.sh/) installed.

### 1. Install Dependencies
```bash
bun install
```

### 2. Start Development Server
Starts the bundler server with HMR enabled:
```bash
bun dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
Compiles and bundles the application for production deployment:
```bash
bun run build
```

### 4. Static Code Quality Enforcement
```bash
# Run Biome code check, formatting audits, and automatic fixes
bun run check

# Check lint rules specifically
bun run lint
```
These checks are also run automatically on commit staged files via Lefthook.
