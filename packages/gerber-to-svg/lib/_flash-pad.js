// creates the SVG for a pad flash
'use strict'

import util from './_util.js'
var shift = util.shift

export default function flashPad(prefix, tool, x, y, element) {
  var toolId = '#' + prefix + '_pad-' + tool

  return element('use', {'xlink:href': toolId, x: shift(x), y: shift(y)})
}
