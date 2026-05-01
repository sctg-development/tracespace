'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import runParallel from 'run-parallel'
import runWaterfall from 'run-waterfall'
import template from 'lodash/template.js'
import createDebug from 'debug'

const debug = createDebug('tracespace/fixtures/server')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TEMPLATE = path.join(__dirname, './template.html')

export default function makeServer(name, getSuites, getSuiteResult) {
  const app = express()

  app.get('/', (request, response) => {
    handleTestRun((error, result) => {
      debug('Test run complete')

      if (error) {
        console.error(error)
        return response.status(500).send({error: error.message})
      }

      response.send(result)
    })
  })

  return app

  function handleTestRun(done) {
    runWaterfall([getSuites, getResults, makeResponse], done)
  }

  function getResults(suites, done) {
    debug(`Rendering specs from ${suites.length} suites`)

    const tasks = suites.map((suite) => (next) => getSuiteResult(suite, next))

    runParallel(tasks, done)
  }

  function makeResponse(results, done) {
    debug(`Running template with ${results.length} suites`)

    runTemplate({name, results}, done)
  }
}

function runTemplate(props, done) {
  runWaterfall(
    [
      (next) => fs.readFile(TEMPLATE, 'utf8', next),
      (contents, next) => {
        try {
          next(null, template(contents)(props))
        } catch (error) {
          next(error)
        }
      },
    ],
    done
  )
}
