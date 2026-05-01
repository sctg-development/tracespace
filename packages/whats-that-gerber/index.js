'use strict'

import constants from './lib/constants.js'
import flatMap from './lib/flat-map.js'
import getCommonCad from './lib/get-common-cad.js'
import getMatches from './lib/get-matches.js'
import layerTypes from './lib/layer-types.js'

export default whatsThatGerber
whatsThatGerber.validate = validate
whatsThatGerber.getAllLayers = getAllLayers

Object.keys(constants).forEach(function (constantName) {
  whatsThatGerber[constantName] = constants[constantName]
})

function whatsThatGerber(filenames) {
  if (typeof filenames === 'string') filenames = [filenames]

  var matches = flatMap(filenames, getMatches)
  var commonCad = getCommonCad(matches)

  return filenames.reduce(function (result, filename) {
    var match = _selectMatch(matches, filename, commonCad)

    result[filename] = match
      ? {type: match.type, side: match.side}
      : {type: null, side: null}

    return result
  }, {})
}

function getAllLayers() {
  return layerTypes
    .map(function (layer) {
      return {type: layer.type, side: layer.side}
    })
    .filter(function (layer) {
      return layer.type !== null
    })
}

function validate(target) {
  return {
    valid: layerTypes.some(_validateLayer),
    side: layerTypes.some(_validateSide) ? target.side : null,
    type: layerTypes.some(_validateType) ? target.type : null,
  }

  function _validateLayer(layer) {
    return layer.side === target.side && layer.type === target.type
  }

  function _validateSide(layer) {
    return layer.side === target.side
  }

  function _validateType(layer) {
    return layer.type === target.type
  }
}

function _selectMatch(matches, filename, cad) {
  var filenameMatches = matches.filter(function (match) {
    return match.filename === filename
  })

  var result = filenameMatches.find(function (match) {
    return match.cad === cad
  })

  return result || filenameMatches[0] || null
}
