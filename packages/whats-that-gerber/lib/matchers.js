'use strict'

import flatMap from './flat-map.js'
import layerTypes from './layer-types.js'

export default flatMap(layerTypes, layerTypeToMatchers)

function layerTypeToMatchers(layer) {
  return flatMap(layer.matchers, matcherToCadMatchers)

  function matcherToCadMatchers(matcher) {
    var match = matcher.ext
      ? new RegExp('\\.' + matcher.ext + '$', 'i')
      : new RegExp(matcher.match, 'i')

    return [].concat(matcher.cad).map(mergeLayerWithCad)

    function mergeLayerWithCad(cad) {
      return {
        type: layer.type,
        side: layer.side,
        match: match,
        cad: cad,
      }
    }
  }
}
