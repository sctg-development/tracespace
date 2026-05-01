#!/usr/bin/env node
'use strict'

import cosmiconfig from 'cosmiconfig'
import yargs from 'yargs'
import createDebug from 'debug'
import cli from './lib/cli.js'

const debug = createDebug('@sctg/tracespace-cli')

cosmiconfig('tracespace')
  .search()
  .then((rc) => {
    debug('default config', rc)
    return rc ? Object.assign({_configFile: rc.filepath}, rc.config) : {}
  })
  .then((config) => {
    const argv = process.argv.slice(2)
    debug('argv', argv)
    return cli(argv, config)
  })
  .then(
    () => {
      debug('cli ran successfully')
      process.exit(0)
    },
    (error) => {
      console.error(`Error: ${error.message}\n\nUsage:`)
      yargs.showHelp()
      process.exit(1)
    }
  )
