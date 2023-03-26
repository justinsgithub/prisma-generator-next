import { join, resolve } from 'path'
import { getImportPath } from '../utils/get-import-path'

function createValObj(modelName: string, provider: string) {
  const sqlite = provider === 'sqlite'
  const createMany = sqlite ? '' : `"createMany": schemas.${modelName}CreateManySchema,`

  const mong = provider === 'mongodb'
  const aggregateRaw = mong ? `"aggregateRaw": schemas.${modelName}AggregateRawObjectSchema,` : ''
  const findRaw = mong ? `"findRaw": schemas.${modelName}FindRawObjectSchema,` : ''

  return `
  "${modelName}": {
    "aggregate": schemas.${modelName}AggregateSchema,
    ${aggregateRaw}
    "findFirst": schemas.${modelName}FindFirstSchema,
    "findMany": schemas.${modelName}FindManySchema,
    ${findRaw}
    "findUnique": schemas.${modelName}FindUniqueSchema,
    "groupBy": schemas.${modelName}GroupBySchema,
    "create": schemas.${modelName}CreateOneSchema,
    ${createMany}
    "update": schemas.${modelName}UpdateOneSchema,
    "updateMany": schemas.${modelName}UpdateManySchema,
    "upsert": schemas.${modelName}UpsertSchema,
    "delete": schemas.${modelName}DeleteOneSchema,
    "deleteMany": schemas.${modelName}DeleteManySchema,
  }
`
}

export function validateTemplate(modelNames: string[], provider: string, outputDir: string): string {
  const opVals = modelNames.map((name) => createValObj(name, provider))
  const joinOpVals = opVals.join(',')
  const schemaImport = getImportPath(resolve(join(outputDir, 'validate.ts')), resolve(join(outputDir, 'schemas')))

  return `
/* IMPORTANT: this file ***IS NOT SAFE*** to edit, will be overwritten every time "prisma generate" is ran */
/* all files in ./prisma-zod directory will also be deleted / overwritten */
import * as schemas from '${schemaImport}';
import { ModelValidations } from './pgen-types';

export const validations: ModelValidations = {
  ${joinOpVals}
}
`
}
