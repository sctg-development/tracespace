// runs @sctg/gerber-to-svg on the gerber spec suite
'use strict'

import path from 'path'
import runParallel from 'run-parallel'
import runWaterfall from 'run-waterfall'
import createDebug from 'debug'

const debug = createDebug('tracespace/@sctg/gerber-to-svg/integration')
import wtg from '@sctg/whats-that-gerber'
import gerberToSvg from '../index.js'

export default function getSuiteResults(suite, done) {
  debug(`Rendering suite ${suite.name}`)

  const specs = suite.specs || suite.layers
  const specTasks = specs.map((spec) => (next) => renderSpec(spec, next))

  runWaterfall(
    [
      (next) => runParallel(specTasks, next),
      (specs, next) => next(null, Object.assign(suite, {specs})),
    ],
    done
  )
}

function renderSpec(spec, done) {
  debug(`Rendering ${spec.category} - ${spec.name}`)

  const renderOptions = Object.assign(
    {
      id: path.basename(spec.filepath),
      plotAsOutline: spec.type === wtg.TYPE_OUTLINE,
    },
    spec.options
  )

  runWaterfall(
    [
      (next) => gerberToSvg(spec.source, renderOptions, next),
      (render, next) => next(null, Object.assign({render}, spec)),
    ],
    done
  )
}
