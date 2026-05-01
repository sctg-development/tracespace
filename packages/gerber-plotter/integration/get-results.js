// runs @sctg/gerber-parser on the gerber spec and board suites
'use strict'

import concat from 'concat-stream'
import pump from 'pump'
import * as __req0 from 'stream'
const { Readable } = __req0
import runParallel from 'run-parallel'
import runWaterfall from 'run-waterfall'
import createDebug from 'debug'

const debug = createDebug('tracespace/@sctg/gerber-plotter/integration')
import gerberParserModule from '@sctg/gerber-parser'
const gerberParser = gerberParserModule.default || gerberParserModule
import gerberPlotter from '@sctg/gerber-plotter'
import wtg from '@sctg/whats-that-gerber'

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
      plotAsOutline: spec.type === wtg.TYPE_OUTLINE,
    },
    spec.options
  )

  let render
  const source = Readable.from([spec.source])
  const parser = gerberParser(renderOptions)
  const plotter = gerberPlotter(renderOptions)
  const dest = concat((result) => (render = result))

  runWaterfall(
    [
      (next) => pump(source, parser, plotter, dest, next),
      (next) => next(null, Object.assign({render}, spec)),
    ],
    done
  )
}
