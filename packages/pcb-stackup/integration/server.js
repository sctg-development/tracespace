// simple visual test server for pcb-stackup
'use strict'

import fs from 'fs'
import * as __req0 from '@sctg/tracespace-fixtures'
const { getBoards, server } = __req0
const pkg = JSON.parse(
  await fs.promises.readFile(new URL('../package.json', import.meta.url), 'utf8')
)
const { name } = pkg
import getBoardResults from './get-results.js'

const PORT = 8000

server(name, getBoards, getBoardResults).listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
)
