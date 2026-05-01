// simple visual test server for @sctg/gerber-to-svg
'use strict'

import fs from 'fs'
import * as __req0 from '@sctg/tracespace-fixtures'
const { getGerberSpecs, server } = __req0
const pkg = JSON.parse(
  await fs.promises.readFile(new URL('../package.json', import.meta.url), 'utf8')
)
const { name } = pkg
import getSuiteResults from './get-results.js'

const PORT = 8002

server(name, getGerberSpecs, getSuiteResults).listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
)
