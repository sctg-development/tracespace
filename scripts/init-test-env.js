'use strict'

const path = require('path')
require('@babel/register')({
  configFile: path.join(__dirname, '../babel.config.js'),
  plugins: ['@babel/plugin-transform-modules-commonjs'],
  extensions: ['.ts', '.d.ts', '.tsx'],
  sourceMaps: 'inline',
})

const chai = require('chai')
const sinonChaiModule = require('sinon-chai')
const chaiAsPromisedModule = require('chai-as-promised')
const sinonChai = sinonChaiModule.default || sinonChaiModule
const chaiAsPromised = chaiAsPromisedModule.default || chaiAsPromisedModule

chai.use(sinonChai)
chai.use(chaiAsPromised)
