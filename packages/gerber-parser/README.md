# gerber parser

> Streaming Gerber/drill file parser

[![latest][@sctg/gerber-parser-latest-badge]][npm]

A printed circuit board Gerber and drill file parser. Implemented as a Node transform stream that takes a Gerber text stream and emits objects to be consumed by some sort of PCB plotter.

Part of the [tracespace][] collection of PCB visualization tools.

[tracespace]: https://github.com/sctg-development/tracespace
[npm]: https://www.npmjs.com/package/@sctg/gerber-parser

[@sctg/gerber-parser-latest-badge]: https://flat.badgen.net/npm/v/@sctg/gerber-parser

## install

```shell
npm install --save @sctg/gerber-parser
```

Or, use a script tag:

```html
<script src="https://unpkg.com/@sctg/gerber-parser@^5.1.0/dist/@sctg/gerber-parser.min.js"></script>
<script>
  // global variable gerberParser now available
  var parser = gerberParser()
</script>
```

## example

```js
import fs from 'node:fs'
import gerberParser from '@sctg/gerber-parser'

const parser = gerberParser()

parser.on('warning', function (w) {
  console.warn('warning at line ' + w.line + ': ' + w.message)
})

fs.createReadStream('/path/to/gerber/file.gbr')
  .pipe(parser)
  .on('data', function (obj) {
    console.log(JSON.stringify(obj))
  })
```

## published packages

Current npm package versions in this fork:

- @sctg/gerber-parser: ^5.1.0
- @sctg/gerber-plotter: ^5.1.0
- @sctg/gerber-to-svg: ^5.1.0
- @sctg/pcb-stackup-core: ^5.1.0
- @sctg/pcb-stackup: ^5.1.0
- @sctg/tracespace-xml-id: ^5.1.0
- @sctg/tracespace-cli: ^5.1.0
- @sctg/tracespace-fixtures: ^5.1.0

To run this module in a browser, it should be bundled with a tool like [browserify][] or [webpack][]. If you are using the script tag installation method instead, there will be a global variable `gerberParser` available after you have included `@sctg/gerber-parser.min.js`.

[browserify]: http://browserify.org/
[webpack]: https://webpack.js.org/

## api

See [API.md](./API.md)
