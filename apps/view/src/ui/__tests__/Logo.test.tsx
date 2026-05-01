// @sctg/tracespace-components tests

import {expect} from 'chai'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import snapshot from 'snap-shot-it'

import * as components from '..'

describe('Logo', () => {
  const {Logo} = components

  it('should provide default width and height', () => {
    const logo = Logo({})

    expect(logo.type).to.equal('svg')
    expect(logo.props.width).to.equal('32px')
    expect(logo.props.height).to.equal('32px')
  })

  it('should take specified width and height', () => {
    const logo = Logo({width: '32', height: 64})

    expect(logo.type).to.equal('svg')
    expect(logo.props.width).to.equal('32')
    expect(logo.props.height).to.equal('64')
  })

  it('should preserve aspect ratio', () => {
    expect(Logo({width: '32'}).props.height).to.equal('32')
    expect(Logo({height: '32'}).props.width).to.equal('32')
  })

  it('should render', () => {
    snapshot(renderToStaticMarkup(<Logo />))
    snapshot(renderToStaticMarkup(<Logo width="32" />))
    snapshot(renderToStaticMarkup(<Logo height="32" />))
    snapshot(renderToStaticMarkup(<Logo width="100%" height="50%" />))
  })
})
