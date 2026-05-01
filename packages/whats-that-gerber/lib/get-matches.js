'use strict'

import extend from 'xtend'

import matchers from './matchers.js'

export default function getMatches(filename) {
  return matchers.map(matcherToFileMatches).filter(Boolean)

  function matcherToFileMatches(matcher) {
    if (!matcher.match.test(filename)) return null
    return extend(matcher, {filename: filename})
  }
}
