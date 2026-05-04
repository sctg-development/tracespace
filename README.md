# @sctg/tracespace

This repository is an updated fork of the original tracespace project:
<https://github.com/tracespace/tracespace>

[![coverage][coverage-badge]][coverage]

> PCB visualization tools for Node.js and the browser

tracespace is an open-source collection of tools to make looking at circuit boards on the internet easier.

[coverage]: https://codecov.io/gh/sctg-development/tracespace
[coverage-badge]: https://flat.badgen.net/codecov/c/github/sctg-development/tracespace

## examples

Renders of the [Arduino Uno][arduino] produced by [@sctg/pcb-stackup][] and [@sctg/gerber-to-svg][]:

![arduino uno top][top]
![arduino uno bottom][bottom]

Arduino Uno design files used under the terms of the [Creative Commons Attribution Share-Alike license][arduino-osh].

<details>
  <summary>Individual layers</summary>
  <h4>top copper</h4>
  <img
    title='arduino uno cmp'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.cmp.svg'
  >

  <h4>drill hits</h4>
  <img
    title='arduino uno drd'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.drd.svg'>

  <h4>outline</h4>
  <img
    title='arduino uno gko'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.gko.svg'>

  <h4>top silkscreen</h4>
  <img
    title='arduino uno plc'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.plc.svg'>

  <h4>bottom copper</h4>
  <img
    title='arduino uno sol'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.sol.svg'>

  <h4>top soldermask</h4>
  <img
    title='arduino uno stc'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.stc.svg'>

  <h4>bottom soldermask</h4>
  <img
    title='arduino uno sts'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.1/example/arduino-uno.sts.svg'>
</details>

[arduino]: https://www.arduino.cc/
[arduino-osh]: https://www.arduino.cc/en/Main/FAQ
[top]: https://unpkg.com/@sctg/pcb-stackup@^5.1.1/example/arduino-uno-top.svg
[bottom]: https://unpkg.com/@sctg/pcb-stackup@^5.1.1/example/arduino-uno-bottom.svg

### tracespace in the wild

- [tracespace.io/view][tracespace-view] - A Gerber viewer powered by the tracespace libraries
- [kitspace.org][kitspace] - An electronics project sharing site with links to easily buy the required parts
- [OpenHardware.io][openhardware] - A social site around open source hardware. Enables authors to sell and manufacture their boards.

[tracespace-view]: https://tracespace.io/view
[kitspace]: https://kitspace.org
[openhardware]: https://www.openhardware.io

## apps

This repository has one web-app published at <https://sctg-development.github.io/tracespace/>.

### [@sctg/tracespace-view][view]

> Probably the best printed circuit board viewer on the internet

A Gerber viewer powered by the tracespace libraries.

The view app is built with Vite 8 and Tailwind CSS 4.2.4 via `@tailwindcss/vite` 4.2.4. Its Tailwind theme is defined in `apps/view/src/styles/index.css` with `@theme`, and component styles are applied directly as Tailwind classes in the React TSX files.

#### React 19 Component

The `@sctg/tracespace-view` package exports a production-ready React 19 component that can be easily embedded into any React application:

```typescript
import {TracespaceViewer} from '@sctg/tracespace-view'

// Minimal usage
export default function MyApp() {
  return <TracespaceViewer />
}

// Embedded with custom branding and file loading
export default function MyApp() {
  return (
    <TracespaceViewer
      showNav={false}
      showLoadFiles={false}
      pageTitle="My PCB Viewer"
      file="/boards/arduino-uno.zip"
      useStorage={true}
    />
  )
}
```

**Key Features:**

- **Self-contained:** Includes the full render pipeline, Web Worker, and Redux-like state management
- **Embeddable:** All props are optional; works with zero configuration or full customization
- **Configurable:** Control UI visibility, branding, file loading, and state persistence
- **React 19 ready:** Modern React patterns with hooks and concurrent rendering

**Props:**

- `showNav` — Show/hide the top navigation bar (default: `true`)
- `showPageTitle` — Show/hide the page title (default: `true`)
- `showPageTitleLogo` — Show/hide the tracespace logo (default: `true`)
- `pageTitle` — Main title text (default: `"tracespace"`)
- `pageSubtitle` — Subtitle text (default: `"view"`)
- `showLoadFiles` — Show/hide the file upload interface (default: `true`)
- `file` — Programmatically load a file (URL, File, Blob, or array of files)
- `useStorage` — Enable persistent state storage via IndexedDB (default: `false`)
- `showAnalyticsOptin` — Show/hide the analytics opt-in modal on first visit (default: `false`)

#### Using in an external project (recommended)

The package ships a pre-compiled ESM bundle (`lib/index.js`) and a pre-built stylesheet (`lib/style.css`). No Tailwind configuration is required in the consumer app.

**1. Install the package:**

```shell
npm install @sctg/tracespace-view
```

**2. Import the stylesheet** once in your app entry point (layout, `_app.tsx`, `main.tsx`, etc.):

```typescript
import '@sctg/tracespace-view/style.css'
```

**3. Use the component:**

```typescript
import {TracespaceViewer} from '@sctg/tracespace-view'

export default function MyPage() {
  return (
    <TracespaceViewer
      showNav={false}
      showLoadFiles={false}
      showAnalyticsOptin={false}
      file="/boards/my-board.zip"
    />
  )
}
```

**4. Configure Vite** to deduplicate React (required with local `file:` dependencies, recommended otherwise):

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
})
```

#### Using in a Tailwind app (monorepo / source-level integration)

If your app already uses Tailwind CSS v4 and you want to share the same build pass, you can point Tailwind at the tracespace-view source files instead of importing the pre-built stylesheet.

**Requirements:** `@tailwindcss/vite` ≥ 4.2.4 installed and registered as a Vite plugin.

**1. Register the plugin** in your `vite.config.ts`:

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**2. Create a CSS entry point** in your app (e.g. `src/index.css`):

```css
@import "tailwindcss";

/* Import the tracespace-view theme (brand colors, fonts, shadows) */
@import "@sctg/tracespace-view/src/styles/theme.css";

/* Tell Tailwind to scan tracespace-view source files for class names */
@source "@sctg/tracespace-view/src";
```

**3. Import the CSS** in your app entry point:

```typescript
import './index.css'
import {TracespaceViewer} from '@sctg/tracespace-view'
```

The `@source` directive is a Tailwind v4 mechanism that explicitly includes an external package's source files in the class-name scan. Without it, Tailwind skips `node_modules` by default and no utility classes are generated for the component.

See [`apps/standalone`](./apps/standalone) for a working reference implementation.

[view]: ./apps/view

## packages

This repository contains multiple packages published on npm.

### core packages (published)

- [@sctg/gerber-parser][] - Streaming Gerber/drill file parser
- [@sctg/gerber-plotter][] - Streaming layer image plotter
- [@sctg/gerber-to-svg][] - Render individual Gerber / NC drill files as SVGs
- [@sctg/pcb-stackup-core][] - Layer stacking core logic
- [@sctg/pcb-stackup][] - Render PCB stackups as SVGs
- [@sctg/tracespace-xml-id][] - XML ID generation and sanitation utilities
- [@sctg/tracespace-cli][] - Command-line renderer
- [@sctg/tracespace-fixtures][] - Test fixtures

### other package

[@sctg/pcb-stackup]: ./packages/pcb-stackup
[@sctg/tracespace-cli]: ./packages/cli
[@sctg/pcb-stackup-core]: ./packages/pcb-stackup-core
[@sctg/gerber-to-svg]: ./packages/gerber-to-svg
[@sctg/gerber-plotter]: ./packages/gerber-plotter
[@sctg/gerber-parser]: ./packages/gerber-parser
[@sctg/whats-that-gerber]: ./packages/whats-that-gerber
[@sctg/tracespace-xml-id]: ./packages/xml-id
[@sctg/tracespace-fixtures]: ./packages/fixtures

## contributing

Issues and pull requests are welcome.

### development setup

The tracespace tools live in this monorepo. We use npm workspaces and Lerna.

Node.js `>=24` and npm `11.12.1` are recommended.

```shell
# clone repository and install dependencies
git clone https://github.com/sctg-development/tracespace.git
cd tracespace
npm install
```

This repository follows Conventional Commits for changelog automation.

```shell
# later, when you're ready to commit
git add .
npx cz
```

All commands below should be run from the repository root.

### tests

Automated tests include unit tests and integration snapshot tests.

```shell
# run tests with coverage
npm test

# update integration snapshots
SNAPSHOT_UPDATE=1 npm test

# run unit tests in watch mode (no coverage)
npm run test:watch

# include integration tests in watch mode
INTEGRATION=1 npm run test:watch
```

### development servers

`@sctg/pcb-stackup`, `@sctg/pcb-stackup-core`, `@sctg/gerber-to-svg`, and `@sctg/tracespace-view` provide development servers.

```shell
# run all dev servers
npm run start

# run server for a specific project
npm run start -- --scope @sctg/tracespace-view
```

### production assets

```shell
# build production bundles
npm run build

# build all bundles, examples, and docs
npm run build:all

# build and serve bundles for validation
npm run serve

# scope by package name when needed
npm run build -- --scope @sctg/gerber-parser
npm run serve -- --scope @sctg/tracespace-view
```

### linting and formatting

```shell
npm run format
npm run lint
npm run types
```

### publishing

Packages are published from CI. To cut a release:

```shell
git checkout main
git pull origin main

# bump using conventional commits
npm run bump

# or specify bump level / exact version
npm run bump -- major
npm run bump -- v5.2.0

# dry run (no tag)
npm run bump -- --no-git-tag-version

git push origin main --follow-tags
```
