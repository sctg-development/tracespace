'use strict'

import path from 'path'
import globby from 'globby'
import isGlob from 'is-glob'
import slash from 'slash'
import untildify from 'untildify'
import createDebug from 'debug'

const debug = createDebug('@sctg/tracespace-cli')

function normalize(filename) {
  return path.normalize(untildify(filename))
}

function resolvePatterns(patterns) {
  const normalized = patterns.map(normalize)
  const files = normalized.filter((p) => !isGlob(slash(p)))
  const globs = normalized.map(slash).filter(isGlob)

  debug('patterns', patterns, 'mapped to files', files, 'and globs', globs)

  const matchPatterns = globs.length > 0 ? globby(globs) : Promise.resolve([])

  return matchPatterns.then((matches) => {
    debug('glob matches', matches)

    // TODO(mc, 2020-04-30): ensure results are deduped
    return files.concat(matches)
  })
}

export default {normalize, resolvePatterns}
