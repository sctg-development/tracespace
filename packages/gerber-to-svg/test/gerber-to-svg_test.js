// test suite for @sctg/gerber-to-svg
'use strict'

import { Readable } from 'node:stream'

import { expect } from 'chai'
import gerberToSvg, { clone, render } from '../index.js'

const EMPTY_GERBER = 'G04 empty gerber*\nM02*\n'

describe('gerber to svg', function () {
  it('should return a converter stream', function () {
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'stream-id'})

    expect(converter).to.exist
    expect(converter).to.have.property('on')
    expect(converter).to.have.property('pipe')
    expect(converter).to.have.property('parser')
    expect(converter).to.have.property('plotter')
  })

  it('should gather readable data from the converter in callback mode', function (done) {
    gerberToSvg(EMPTY_GERBER, {id: 'callback-id'}, function (error, result) {
      try {
        expect(error == null).to.equal(true)
        expect(result).to.match(/^<svg[^>]*>/)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should allow options param to be skipped', function (done) {
    gerberToSvg(EMPTY_GERBER, function (error, result) {
      try {
        expect(error == null).to.equal(true)
        expect(result).to.match(/^<svg[^>]*>/)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should pipe a stream input into the parser', function (done) {
    const input = Readable.from([EMPTY_GERBER])

    gerberToSvg(input, {id: 'stream-input'}, function (error, result) {
      try {
        expect(error == null).to.equal(true)
        expect(result).to.match(/^<svg[^>]*>/)
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should propagate warnings from the parser', function (done) {
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'warn-id'})
    const warning = {}

    converter.once('warning', function (w) {
      try {
        expect(w).to.equal(warning)
        done()
      } catch (e) {
        done(e)
      }
    })

    converter.parser.emit('warning', warning)
  })

  it('should propagate warnings from the plotter', function (done) {
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'warn-id-2'})
    const warning = {}

    converter.once('warning', function (w) {
      try {
        expect(w).to.equal(warning)
        done()
      } catch (e) {
        done(e)
      }
    })

    converter.plotter.emit('warning', warning)
  })

  it('should propagate errors from the parser', function (done) {
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'error-id'})
    const expectedError = new Error('parser-failure')

    converter.once('error', function (error) {
      try {
        expect(error).to.equal(expectedError)
        done()
      } catch (e) {
        done(e)
      }
    })

    converter.parser.emit('error', expectedError)
  })

  it('should return callback errors from the parser', function (done) {
    const expectedError = new Error('parser-callback-failure')
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'error-id-2'}, function (error) {
      try {
        expect(error).to.equal(expectedError)
        done()
      } catch (e) {
        done(e)
      }
    })

    converter.parser.emit('error', expectedError)
  })

  it('should take the filetype format from the parser', function (done) {
    const converter = gerberToSvg(EMPTY_GERBER, {id: 'filetype-id'}, function (error) {
      try {
        expect(error == null).to.equal(true)
        expect(converter.filetype).to.equal('gerber')
        done()
      } catch (e) {
        done(e)
      }
    })

    expect(converter.filetype == null).to.equal(true)
  })

  it('should expose a render function', function () {
    const fakeConverter = {
      defs: ['the'],
      layer: ['other'],
      viewBox: [0, 1, 2, 3],
      width: 'I',
      height: 'must',
      units: 'have',
    }

    expect(String(render)).to.equal(String(gerberToSvg.render || render))
    expect(render(fakeConverter)).to.equal(render(fakeConverter))
  })

  it('should expose a clone helper', function () {
    const converter = {
      parser: 'hello',
      plotter: 'from',
      defs: 'the',
      layer: 'other',
      viewBox: 'side',
      width: 'I',
      height: 'must',
      units: 'have',
      _foo: 'called',
    }

    expect(clone(converter)).to.eql({
      defs: 'the',
      layer: 'other',
      viewBox: 'side',
      width: 'I',
      height: 'must',
      units: 'have',
    })
  })
})
