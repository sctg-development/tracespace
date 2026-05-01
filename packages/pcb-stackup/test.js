// test suite for pcb-stackup
'use strict'

import { expect } from 'chai'

import pcbStackup from './index.js'

const EMPTY_GERBER = 'G04 empty gerber*\nM02*\n'

describe('pcb stackup', function () {
  it('should accept and call node style callback', function (done) {
    const layers = [{gerber: EMPTY_GERBER, side: 'top', type: 'copper'}]

    pcbStackup(layers, function (error, stackup) {
      try {
        expect(error).to.equal(null)
        expect(stackup).to.have.property('layers')
        expect(stackup.layers).to.have.lengthOf(1)
        expect(stackup).to.have.property('top')
        expect(stackup).to.have.property('bottom')
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should accept options as the second argument', function () {
    const layers = [{gerber: EMPTY_GERBER, side: 'top', type: 'copper'}]
    const options = {useOutline: false}

    return pcbStackup(layers, options).then(function (stackup) {
      expect(stackup.layers).to.have.lengthOf(1)
      expect(stackup.top.svg).to.match(/^<svg[^>]*>/)
      expect(stackup.bottom.svg).to.match(/^<svg[^>]*>/)
    })
  })

  it('should return a promise if no callback passed', function () {
    const layers = [{gerber: EMPTY_GERBER, side: 'top', type: 'copper'}]

    return pcbStackup(layers).then(function (stackup) {
      expect(stackup).to.have.property('layers')
      expect(stackup.layers).to.have.lengthOf(1)
    })
  })

  describe('invalid layer input', function () {
    const SPECS = [
      {
        name: 'should throw if no layers given',
        layers: undefined,
        expected: /first argument should be an array of layers/,
      },
      {
        name: 'should throw if no gerber or converter given',
        layers: [{filename: 'filename.gbr'}],
        expected: /layer 0 .+ missing gerber/,
      },
      {
        name: 'should throw if no filename or type is given',
        layers: [{gerber: 'gerber'}],
        expected: /layer 0 .+ missing filename/,
      },
      {
        name: 'should throw when invalid layer type is given',
        layers: [{gerber: 'gerber', type: 'wrong', side: 'top'}],
        expected: /layer 0 .+ invalid side\/type/,
      },
    ]

    SPECS.forEach(function (spec) {
      it(spec.name, function () {
        const task = function () {
          pcbStackup(spec.layers)
        }

        expect(task).to.throw(spec.expected)
      })
    })
  })
})
