import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {browserScriptConfig} from '../../config/vite.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default browserScriptConfig({
  entry: path.join(__dirname, 'index.js'),
  fileName: 'whats-that-gerber',
  name: 'whatsThatGerber',
})
