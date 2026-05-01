// mocha configuration
'use strict'

module.exports = {
  require: ['./scripts/init-test-env.js'],
  'watch-extensions': ['js', 'ts', 'tsx', 'json'],
  spec: ['apps/**/__tests__/*.@(js|ts|tsx)', 'packages/**/*test.js'],
}
