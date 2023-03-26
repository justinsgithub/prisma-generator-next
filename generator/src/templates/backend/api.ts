import { join, resolve } from 'path'
import { getImportPath } from '../../utils/get-import-path'
import { lowerCase, lowerPlural } from '../../utils/write-file-safely'

interface ApiTemplate {
  isDefaultExport: boolean
  apiPath: string
  prismaVarName: string
  modelName: string
  provider: string
  outputDir: string
}

export function apiTemplate(params: ApiTemplate): string {
  const { isDefaultExport, apiPath, prismaVarName, modelName, provider, outputDir } = params
  const indexFilePath = join(outputDir, 'index.ts')
  const fullPath = resolve(join(apiPath, lowerPlural(modelName), 'index.ts'))
  const importPath = getImportPath(fullPath, resolve(indexFilePath))
  const pgenImport1 = `import ${prismaVarName}, { useMiddleware } from '${importPath}'`
  const pgenImport2 = `import { ${prismaVarName}, useMiddleware } from '${importPath}'`
  const pgenImport = isDefaultExport ? pgenImport1 : pgenImport2
  const lowerName = lowerCase(modelName)

  const sqlite = provider === 'sqlite'
  const createMany = sqlite
    ? ''
    : `if (operation === 'createMany') return res.status(201).send(await prisma.${lowerName}.createMany(args))`

  const mong = provider === 'mongodb'
  const aggRaw = mong
    ? `if (operation === 'aggregateRaw') return res.status(200).send(await prisma.${lowerName}.aggregateRaw(args))`
    : ''
  const findRaw = mong
    ? `if (operation === 'findRaw') return res.status(200).send(await prisma.${lowerName}.findRaw(args))`
    : ''

  return `/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
import type { NextApiHandler } from 'next'
${pgenImport}

const handler: NextApiHandler = async (req, res) => {
  // method, operation, and args should all be validated in middleware
  const method = req.method
  const operation = req.query.op
  const args = req.body
  if (method === 'POST') {
    if (operation === 'create') return res.status(201).send(await prisma.${lowerName}.create(args))
    ${createMany}
    return res.status(201).send(await prisma.${lowerName}.upsert(args))
  }

  if (method === 'GET') {
    if (operation === 'aggregate') return res.status(200).send(await prisma.${lowerName}.aggregate(args))
    ${aggRaw}
    if (operation === 'findFirstOrThrow') return res.status(200).send(await prisma.${lowerName}.findFirstOrThrow(args))
    if (operation === 'findMany') return res.status(200).send(await prisma.${lowerName}.findMany(args))
    ${findRaw}
    if (operation === 'findUnique') return res.status(200).send(await prisma.${lowerName}.findUnique(args))
    if (operation === 'findUniqueOrThrow') return res.status(200).send(await prisma.${lowerName}.findUniqueOrThrow(args))
    if (operation === 'groupBy') return res.status(200).send(await prisma.${lowerName}.groupBy(args))
    return res.status(200).send(await prisma.${lowerName}.findFirst(args))
  }

  if (method === 'PUT') {
    if (operation === 'update') return res.status(200).send(await prisma.${lowerName}.update(args))
    if (operation === 'updateMany') return res.status(200).send(await prisma.${lowerName}.updateMany(args))
    return res.status(200).send(await prisma.${lowerName}.upsert(args))
  }

  if (method === 'DELETE') {
    if (operation === 'delete') return res.status(200).send(await prisma.${lowerName}.delete(args))
    return res.status(200).send(await prisma.${lowerName}.deleteMany(args))
  }

  // middleware performs all checks necessary to ensure one of the above conditions is met, or handles it otherwise
  return res.status(500).send("MIDDLEWARE MALFUNCTION, THIS SHOULDN'T BE POSSIBLE")
}

export default useMiddleware({model: '${modelName}', handler})
`
}
