'use strict'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false, useBuiltIns: 'usage', corejs: 3}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', {loose: true}],
    ['@babel/plugin-transform-private-methods', {loose: true}],
    ['@babel/plugin-transform-private-property-in-object', {loose: true}],
    ['@babel/plugin-transform-object-rest-spread', {loose: true}],
    '@babel/plugin-syntax-dynamic-import',
  ],
}
