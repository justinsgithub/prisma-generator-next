import fs from 'fs'
import path from 'path'
import { formatFile } from './format-file'
import { log } from '../logger'
import pluralize from 'pluralize'

/** 
format model name for api-route name
*/
export const lowerPlural = (modelName: string) => pluralize(modelName.toLowerCase())

const indexExports = new Set<string>()

function addIndexExport(filePath: string) {
  indexExports.add(filePath)
}

export async function writeFileSafely(writeLocation: string, content: string, addToZodIndex = false) {
  try {
    fs.mkdirSync(path.dirname(writeLocation), {
      recursive: true,
    })
    fs.writeFileSync(writeLocation, await formatFile(content))
    if (addToZodIndex) {
      addIndexExport(writeLocation)
    }
  } catch (error) {
    log.error('ERROR WRITING FILE', error)
    throw error
  }
}

function normalizePath(path: string) {
  if (typeof path !== 'string') {
    throw new TypeError('Expected argument path to be a string')
  }
  if (path === '\\' || path === '/') return '/'

  const len = path.length
  if (len <= 1) return path
  let prefix = ''
  if (len > 4 && path[3] === '\\') {
    const ch = path[2]
    if ((ch === '?' || ch === '.') && path.slice(0, 2) === '\\\\') {
      path = path.slice(2)
      prefix = '//'
    }
  }

  const segs = path.split(/[/\\]+/)
  return prefix + segs.join('/')
}

export async function writeIndexFile(indexPath: string) {
  const rows = Array.from(indexExports).map((filePath) => {
    let relativePath = path.relative(path.dirname(indexPath), filePath)
    if (relativePath.endsWith('.ts')) {
      relativePath = relativePath.slice(0, relativePath.lastIndexOf('.ts'))
    }
    const normalized = normalizePath(relativePath)
    return `export * from './${normalized}'`
  })
  const content = rows.join('\n')
  await writeFileSafely(indexPath, content)
}
