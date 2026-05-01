// parse options from input
'use strict'

import boardColor from './board-color.js'
import xid from '@sctg/tracespace-xml-id'
import xmlElementString from 'xml-element-string'

export default function parseOptions(input) {
  if (typeof input === 'string') {
    input = {id: input}
  } else if (!input) {
    input = {}
  }

  return {
    id: xid.ensure(input.id),
    color: boardColor.getColor(input.color),
    attributes: input.attributes || {},
    useOutline: input.useOutline != null ? input.useOutline : true,
    createElement: input.createElement || xmlElementString,
  }
}
