// test suite for the main pcb stackup function
'use strict'

import { expect } from 'chai'
import xmlElementString from 'xml-element-string'

import wtg from '@sctg/whats-that-gerber'
import pcbStackupCore from '../index.js'

function converter(overrides = {}) {
  return {
    defs: [],
    layer: [],
    viewBox: [0, 0, 1000, 1000],
    width: 1,
    height: 1,
    units: 'in',
    ...overrides,
  }
}

describe('pcb stackup function', function () {
  it('should have a createElement option that defaults to xml-element-string', function () {
    const calls = []
    const customElement = function (tag, attributes, children) {
      calls.push({tag, attributes, children})
      return xmlElementString(tag, attributes, children)
    }

    const layers = [
      {side: wtg.SIDE_TOP, type: wtg.TYPE_COPPER, converter: converter()},
      {side: wtg.SIDE_BOTTOM, type: wtg.TYPE_COPPER, converter: converter()},
    ]

    const result = pcbStackupCore(layers, {id: 'foo', createElement: customElement})

    expect(result.top.svg).to.match(/^<svg[^>]*>/)
    expect(result.bottom.svg).to.match(/^<svg[^>]*>/)
    expect(calls.length).to.be.greaterThan(0)
  })

  it('should return top and bottom SVG with base attributes', function () {
    const layers = [
      {side: wtg.SIDE_TOP, type: wtg.TYPE_COPPER, converter: converter()},
      {side: wtg.SIDE_BOTTOM, type: wtg.TYPE_COPPER, converter: converter()},
    ]

    const result = pcbStackupCore(layers, 'foobar')

    expect(result.top.attributes.id).to.equal('foobar_top')
    expect(result.bottom.attributes.id).to.equal('foobar_bottom')
    expect(result.top.attributes.xmlns).to.equal('http://www.w3.org/2000/svg')
    expect(result.top.attributes.version).to.equal('1.1')
    expect(result.top.attributes['xmlns:xlink']).to.equal('http://www.w3.org/1999/xlink')
    expect(result.top.svg).to.match(/^<svg[^>]*>/)
    expect(result.bottom.svg).to.match(/^<svg[^>]*>/)
  })

  it('should have a default color style', function () {
    const layers = [
      {side: wtg.SIDE_TOP, type: wtg.TYPE_COPPER, converter: converter()},
      {side: wtg.SIDE_BOTTOM, type: wtg.TYPE_COPPER, converter: converter()},
    ]

    const result = pcbStackupCore(layers, 'foobar')

    expect(result.top.svg).to.contain('.foobar_fr4 {color: #666666;}')
    expect(result.top.svg).to.contain('.foobar_cu {color: #cccccc;}')
    expect(result.bottom.svg).to.contain('.foobar_fr4 {color: #666666;}')
  })

  it('should handle user input colors', function () {
    const layers = [
      {side: wtg.SIDE_TOP, type: wtg.TYPE_COPPER, converter: converter()},
      {side: wtg.SIDE_BOTTOM, type: wtg.TYPE_COPPER, converter: converter()},
    ]

    const result = pcbStackupCore(layers, {
      id: 'foobar',
      color: {cu: '#123', cf: '#456', sp: '#789'},
    })

    expect(result.top.svg).to.contain('.foobar_cu {color: #112233;}')
    expect(result.top.svg).to.contain('.foobar_cf {color: #445566;}')
    expect(result.top.svg).to.contain('.foobar_sp {color: #778899;}')
  })

  it('should allow arbitrary stuff in the attributes', function () {
    const layers = [
      {side: wtg.SIDE_TOP, type: wtg.TYPE_COPPER, converter: converter()},
      {side: wtg.SIDE_BOTTOM, type: wtg.TYPE_COPPER, converter: converter()},
    ]

    const result = pcbStackupCore(layers, {
      id: 'foo',
      attributes: {bar: 'baz'},
    })

    expect(result.top.attributes.bar).to.equal('baz')
    expect(result.bottom.attributes.bar).to.equal('baz')
    expect(result.top.svg).to.contain('bar="baz"')
  })
})
