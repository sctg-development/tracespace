'use strict'

import options from './options.js'

export default [
  {
    cmd: '$0',
    desc: 'Render files in `cwd` and output to `cwd`',
  },
  {
    cmd: '$0 --out=-',
    desc: 'Render files in `cwd` and output to `stdout`',
  },
  ...Object.keys(options).map((name) => options[name].example),
]
