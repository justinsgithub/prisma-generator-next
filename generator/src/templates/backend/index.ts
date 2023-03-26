import { getImportPath } from '../../utils/get-import-path'
export * from './db'
export * from '../pgen-types'
export * from './api'
export * from './middleware'
export * from '../validate'

interface Params {
  isDefaultExport: boolean
  indexFilePath: string | null
  prismaFilePath: string
  prismaVarName: string
}

export function indexTemplate(params: Params): string | null {
  const { isDefaultExport, indexFilePath, prismaFilePath, prismaVarName } = params
  if (!indexFilePath || !prismaFilePath) return null
  const prismaImportPath = getImportPath(indexFilePath, prismaFilePath)
  const prismaImport = `import { ${prismaVarName} } from '${prismaImportPath}'`
  const defaultPrismaImport = `import ${prismaVarName} from '${prismaImportPath}'`

  return `
/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
import { serialize } from 'superjson'
${isDefaultExport ? defaultPrismaImport : prismaImport}
import { useMiddleware } from './middleware'

// needed in order to work with js-incompatible types such as BigInt
${prismaVarName}.$use(async (params, next) => {
  // prisma.$use is how you add middleware for prisma (ran before and after database interactions, separate from api-route middleware)
  const _result = await next(params)
  const result = serialize(_result)
  return result.json
})

/* IMPORTANT: these exports are assumed to be exported from this file in newly-generated api-routes */
/* can still modify / customize / remove functionality and middleware from them as much as needed */
export { ${prismaVarName}, useMiddleware }
`
}
