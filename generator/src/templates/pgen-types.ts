import { DMMF } from '@prisma/generator-helper'

function makeUnion(stringArray: string[]): string {
  const quotedStrings = stringArray.map((str) => `'${str}'`)
  return quotedStrings.join(' | ')
}

export function typesTemplate(modelMappings: DMMF.ModelMapping[]): string {
  const modelNames = modelMappings.map((mapping) => mapping.model)
  let modelOps = Object.keys(modelMappings[0]).filter((mapping) => mapping !== 'model')
  modelOps = modelOps.map((mapping) => mapping.replace('One', ''))
  const modelName = `export type ModelName = ${makeUnion(modelNames)}`
  const modelOp = `export type ModelOp = ${makeUnion(modelOps)}`

  return `
/* IMPORTANT: this file ***IS NOT SAFE*** to edit, will be overwritten every time "prisma generate" is ran */
import { ZodObject } from 'zod'

${modelOp}

${modelName}

export type ValidateOp = Exclude<ModelOp, 'findFirstOrThrow' | 'findUniqueOrThrow'>

export type ModelValidations = Record<ModelName, Record<ValidateOp, ZodObject<any>>>
`
}
