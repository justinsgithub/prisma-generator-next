import { existsSync } from 'fs'
import path from 'path'
import { lowerPlural, writeFileSafely } from './write-file-safely'
import { PgenFiles } from '../types'

const nullIfExists = (path: string): string | null => (existsSync(path) ? null : path)

/*
  get files that are going to be written to outputDir
  first generate: index, db, middleware, api-routes
  every generate: types, validate, schemas/
*/
export function getPgenFiles( apiPath: string, modelNames: string[], prismaFilePath: string, outputDir: string): PgenFiles {
  const backend = path.join(outputDir, 'backend')
  const types = path.join(outputDir, 'pgen-types.d.ts')
  const validate = path.join(outputDir, 'validate.ts')
  const schemas = path.join(backend, 'schemas')
  const index = nullIfExists(path.join(backend, 'index.ts'))
  const db = nullIfExists(prismaFilePath)
  const middleware = nullIfExists(path.join(backend, 'middleware.ts'))


  const apiRoutes = modelNames.map((name) => {
    const modelName = name
    const formattedName = lowerPlural(name)
    const apiRoute = nullIfExists(path.join(apiPath, formattedName, 'index.ts'))
    return { modelName, apiRoute }
  })

  return { types, validate, schemas, apiRoutes, index, db, middleware }
}

export type Content = {
  db: string
  index: string | null
  middleware: string | null
  types: string
  validate: string
  apiRoutes: { modelName: string; apiRoute: string | null; content: string }[]
}

export async function writePgenFiles(files: PgenFiles, content: Content) {
  files.db && (await writeFileSafely(files.db, content.db))
  files.index && content.index && (await writeFileSafely(files.index, content.index))
  files.middleware && content.middleware && (await writeFileSafely(files.middleware, content.middleware))
  await writeFileSafely(files.types, content.types)
  await writeFileSafely(files.validate, content.validate)
  for (const route of content.apiRoutes) {
    route.apiRoute && (await writeFileSafely(route.apiRoute, route.content))
  }
}
