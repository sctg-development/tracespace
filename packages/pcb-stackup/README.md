# pcb stackup

[![latest][@sctg/pcb-stackup-latest-badge]][npm]
[![david][pcb-stackup-david-badge]][david]

> Render PCBs as beautiful, precise SVGs from Gerber / NC drill files

Part of the [tracespace][] collection of PCB visualization tools.

[tracespace]: https://github.com/sctg-development/tracespace
[npm]: https://www.npmjs.com/package/@sctg/pcb-stackup
[david]: https://david-dm.org/sctg-development/tracespace?path=packages/pcb-stackup
[@sctg/pcb-stackup-latest-badge]: https://flat.badgen.net/npm/v/@sctg/pcb-stackup
[pcb-stackup-david-badge]: https://flat.badgen.net/david/dep/sctg-development/tracespace/packages/pcb-stackup

## install

```shell
npm install --save @sctg/pcb-stackup
```

Or, use a script tag:

```html
<script src="https://unpkg.com/@sctg/pcb-stackup@^5.1.0/dist/@sctg/pcb-stackup.min.js"></script>
<script>
  // global variable pcbStackup now available
  pcbStackup(layers).then((stackup) => {
    // ...
  })
</script>
```

## example

![arduino-uno-top](https://unpkg.com/@sctg/pcb-stackup@^5.1.0/example/arduino-uno-top.svg)
![arduino-uno-bottom](https://unpkg.com/@sctg/pcb-stackup@^5.1.0/example/arduino-uno-bottom.svg)

After you clone and set-up the repository as detailed in [development setup](../..#development-setup), you can run `pcb-stackup`'s [example script](./example/index.js) to render the top and bottom of an Arduino Uno PCB.

```shell
cd tracespace/packages/pcb-stackup
npm run example
```

Arduino Uno design files used here under the terms of the [Creative Commons Attribution Share-Alike license](https://www.arduino.cc/en/Main/FAQ).

## usage

This module is designed to work in Node or in the browser with Browserify or
Webpack. The function takes three parameters: an array of layer objects an
optional settings object and a callback function.

```javascript
const fs = require('fs')
const pcbStackup = require('@sctg/pcb-stackup')

const fileNames = [
  '/path/to/board-F.Cu.gtl',
  '/path/to/board-F.Mask.gts',
  '/path/to/board-F.SilkS.gto',
  '/path/to/board-F.Paste.gtp',
  '/path/to/board-B.Cu.gbl',
  '/path/to/board-B.Mask.gbs',
  '/path/to/board-B.SilkS.gbo',
  '/path/to/board-B.Paste.gbp',
  '/path/to/board-Edge.Cuts.gm1',
  '/path/to/board.drl',
  '/path/to/board-NPTH.drl',
]

const layers = fileNames.map((filename) => ({
  filename,
  gerber: fs.createReadStream(filename),
}))

pcbStackup(layers).then((stackup) => {
  console.log(stackup.top.svg) // logs "<svg ... </svg>"
  console.log(stackup.bottom.svg) // logs "<svg ... </svg>"
})
```

## API

See [the API documentation](./API.md).

If your board doesn't appear at all or looks weirdly distorted, try rendering it
with the options `{maskWithOutline: false}` or filling in gaps in the outline
with e.g. `{outlineGapFill: 0.011}`.
