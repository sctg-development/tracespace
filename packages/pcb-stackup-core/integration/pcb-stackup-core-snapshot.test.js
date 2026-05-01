// pcb-stackup-core render snapshot tests
'use strict'

import prettier from 'prettier'
import snapshot from 'snap-shot-it'

import * as __req0 from '@sctg/tracespace-fixtures'
const { getBoards } = __req0
import getResults from './get-results.js'

const SIDES = ['top', 'bottom']
const BOARDS = getBoards.sync().filter((b) => !b.skipSnapshot)

describe(`pcb-stackup-core :: integration`, function () {
  this.timeout(15000)

  BOARDS.forEach((board, index) =>
    describe(board.name, function () {
      let boardResults

      before(function (done) {
        if (process.env.INTEGRATION !== '1') return this.skip()

        getResults(board, (error, results) => {
          if (error) return done(error)
          boardResults = results
          done()
        })
      })

      SIDES.forEach((side) =>
        it(`renders ${side}`, async function () {
          const result = boardResults.specs.find((s) => s.name === side)
          const formatted = await prettier.format(result.render, {
            parser: 'html',
          })
          snapshot(formatted.split('\n'))
        })
      )
    })
  )
})
