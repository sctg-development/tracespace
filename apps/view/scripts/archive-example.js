'use strict'

const fs = require('fs/promises')
const path = require('path')
const JSZip = require('jszip')

const outFile = path.join(__dirname, '..', 'dist', 'arduino-uno.zip')
const fixtureDir = path.join(
  path.dirname(require.resolve('@sctg/tracespace-fixtures')),
  'boards',
  'arduino-uno'
)

async function addDirectory(zip, directory, prefix = '') {
  const entries = await fs.readdir(directory, {withFileTypes: true})

  await Promise.all(
    entries.map(async (entry) => {
      const source = path.join(directory, entry.name)
      const name = path.join(prefix, entry.name)

      if (entry.isDirectory()) {
        await addDirectory(zip, source, name)
      } else {
        zip.file(name, await fs.readFile(source))
      }
    })
  )
}

async function main() {
  const zip = new JSZip()

  await addDirectory(zip, fixtureDir)
  await fs.mkdir(path.dirname(outFile), {recursive: true})
  await fs.writeFile(outFile, await zip.generateAsync({type: 'nodebuffer'}))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
