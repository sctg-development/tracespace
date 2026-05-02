# xml id

[![latest][@sctg/tracespace-xml-id-latest-badge]][npm]
[![david][@sctg/tracespace-xml-id-david-badge]][david]

> XML ID generation and sanitation utilities for tracespace projects

ID attributes in XML documents (e.g. SVG images) have certain requirements. This module provides utility methods for sanitizing and generating strings to meet those requirements so they can safely be used as XML IDs.

Part of the [tracespace][] collection of PCB visualization tools.

[tracespace]: https://github.com/sctg-development/tracespace
[npm]: https://www.npmjs.com/package/@sctg/tracespace-xml-id
[david]: https://david-dm.org/sctg-development/tracespace?path=packages/xml-id
[@sctg/tracespace-xml-id-latest-badge]: https://flat.badgen.net/npm/v/@sctg/tracespace-xml-id
[@sctg/tracespace-xml-id-david-badge]: https://flat.badgen.net/david/dep/sctg-development/tracespace/packages/xml-id

## install

Please note: because this package is an internal utility library, it may not follow semver and breaking changes could be introduced in _any_ version bump. **You should install an exact version.**

```shell
npm install --save --save-exact @sctg/tracespace-xml-id
```

## usage

```js
const {sanitize, random} = require('@sctg/tracespace-xml-id')
```

The alphabet used by this module is a subset of what is valid for XML which is also CSS identifier and URL friendly.

### sanitize(source: string): string

Takes a string and replaces any characters that would be invalid in an XML ID with underscores (`_`).

```js
const id = sanitize('0abc def.') // id === _abc_def_
```

### random(length: number): string

Returns a basic, (non-cryptographically-secure) random string that can be safely used as an XML ID. If unspecified or 0, `length` will be 12.

```js
const id = random() // maybe "w57gH_nT3-o8"
const id = random(8) // maybe "Gi3ma2Ef"
```
