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
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.cmp.svg'
  >

  <h4>drill hits</h4>
  <img
    title='arduino uno drd'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.drd.svg'>

  <h4>outline</h4>
  <img
    title='arduino uno gko'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.gko.svg'>

  <h4>top silkscreen</h4>
  <img
    title='arduino uno plc'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.plc.svg'>

  <h4>bottom copper</h4>
  <img
    title='arduino uno sol'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.sol.svg'>

  <h4>top soldermask</h4>
  <img
    title='arduino uno stc'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.stc.svg'>

  <h4>bottom soldermask</h4>
  <img
    title='arduino uno sts'
    src='https://unpkg.com/@sctg/gerber-to-svg@^5.1.0/example/arduino-uno.sts.svg'>
</details>

[arduino]: https://www.arduino.cc/
[arduino-osh]: https://www.arduino.cc/en/Main/FAQ
[top]: https://unpkg.com/@sctg/pcb-stackup@^5.1.0/example/arduino-uno-top.svg
[bottom]: https://unpkg.com/@sctg/pcb-stackup@^5.1.0/example/arduino-uno-bottom.svg

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

[view]: ./apps/view

## packages

This repository contains multiple packages published on npm.

### core packages (published)

- [@sctg/gerber-parser][] - `^5.1.0` - Streaming Gerber/drill file parser
- [@sctg/gerber-plotter][] - `^5.1.0` - Streaming layer image plotter
- [@sctg/gerber-to-svg][] - `^5.1.0` - Render individual Gerber / NC drill files as SVGs
- [@sctg/pcb-stackup-core][] - `^5.1.0` - Layer stacking core logic
- [@sctg/pcb-stackup][] - `^5.1.0` - Render PCB stackups as SVGs
- [@sctg/tracespace-xml-id][] - `^5.1.0` - XML ID generation and sanitation utilities
- [@sctg/tracespace-cli][] - `^5.1.0` - Command-line renderer
- [@sctg/tracespace-fixtures][] - `^5.1.0` - Test fixtures

### other package

- [@sctg/whats-that-gerber][] - Identify Gerber and drill files by filename

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
