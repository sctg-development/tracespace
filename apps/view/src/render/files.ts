import {Buffer} from 'buffer'
import MD5 from 'md5.js'
import {isZip} from '../util'
import {baseName, promiseFlatMap, PromiseArray} from './util'

export type FileToWrite = {name: string; contents: string}

export async function readFiles(files: Array<File>): PromiseArray<FileStream> {
  return promiseFlatMap(files, async (file: File) =>
    isZip(file) ? zipReader(file) : [await fileReader(file)]
  )
}

export async function fetchZipFile(url: string): PromiseArray<FileStream> {
  console.log('[fetchZipFile] Starting fetch from:', url.slice(0, 100))
  return fetch(url)
    .then((response) => {
      console.log(
        '[fetchZipFile] Response status:',
        response.status,
        response.ok
      )
      if (response.ok) return response.blob()
      throw new Error(`Could not fetch ${url}: ${response.status}`)
    })
    .then((blob) => {
      console.log(
        '[fetchZipFile] Blob received, size:',
        blob.size,
        'type:',
        blob.type
      )
      if (isZip(blob)) {
        console.log('[fetchZipFile] ZIP detected, reading entries')
        return zipReader(blob)
      }
      throw new Error(`${url} is not a zip file`)
    })
    .catch((error) => {
      console.error('[fetchZipFile] Error:', error)
      throw error
    })
}

export async function writeFiles(files: Array<FileToWrite>): Promise<Blob> {
  return import('jszip').then((ZipModule) => {
    const zip = ZipModule.default()
    files.forEach((f) => zip.file(f.name, f.contents))
    return zip.generateAsync({type: 'blob'})
  })
}

export class FileStream {
  name: string

  digest: string

  contents: Buffer

  constructor(filename: string, digest: string, contents: Buffer) {
    this.name = baseName(filename)
    this.digest = digest
    this.contents = contents
  }
}

async function fileReader(file: File): Promise<FileStream> {
  const contents = await file.arrayBuffer()
  return fileStreamFromContents(file.name, contents)
}

function fileStreamFromContents(
  filename: string,
  contents: ArrayBuffer | Uint8Array
): FileStream {
  const bytes =
    contents instanceof Uint8Array ? contents : new Uint8Array(contents)
  const buffer = Buffer.from(bytes)
  const hasher = new MD5()

  hasher.update(buffer)

  return new FileStream(filename, hasher.digest('hex'), buffer)
}

async function zipReader(file: Blob): PromiseArray<FileStream> {
  console.log('[zipReader] Loading jszip...')
  return import('jszip')
    .then((ZipModule) => {
      console.log('[zipReader] jszip loaded, loading async...')
      return ZipModule.loadAsync(file)
    })
    .then((zip) => {
      console.log(
        '[zipReader] ZIP loaded, files count:',
        Object.keys(zip.files).length
      )
      return Promise.all(
        Object.keys(zip.files)
          .filter((name) => !zip.files[name].dir)
          .map(async (name) => {
            console.log('[zipReader] Processing file:', name)
            const bytes = await zip.files[name].async('uint8array')
            return fileStreamFromContents(name, bytes)
          })
      )
    })
    .catch((error) => {
      console.error('[zipReader] Error:', error)
      throw error
    })
}
