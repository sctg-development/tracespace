// runs pcb-stackup on the board fixtures
'use strict'

import runWaterfall from 'run-waterfall'
import createDebug from 'debug'

const debug = createDebug('tracespace/pcb-stackup/integration')
import pcbStackup from '../index.js'

export default function getBoardResults(board, done) {
  debug(`Render started for ${board.name}`)

  const options = Object.assign({id: `__${board.name}`}, board.options)
  const layers = board.layers.map((layer) => {
    const {filename} = layer

    return {
      filename: filename,
      gerber: layer.source,
      options: Object.assign({id: `__${filename}`}, layer.options),
    }
  })

  runWaterfall(
    [
      (next) => pcbStackup(layers, options, next),
      (stackup, next) => next(null, makeBoardResult(board, stackup)),
    ],
    done
  )
}

function makeBoardResult(board, stackup) {
  return Object.assign(
    {
      specs: [
        {name: 'top', render: stackup.top.svg},
        {name: 'bottom', render: stackup.bottom.svg},
      ],
    },
    board
  )
}
