import { DMMF, GeneratorOptions } from '@prisma/generator-helper'
import { getDMMF } from '@prisma/internals'
import { promises as fs } from 'fs'
import {
  addMissingInputObjectTypes,
  hideInputObjectTypesAndRelatedFields,
  resolveAddMissingInputObjectTypeOptions,
  resolveModelsComments,
} from './helpers'
import { resolveAggregateOperationSupport } from './helpers/aggregate-helpers'
import Transformer from './transformer'
import { AggregateOperationSupport } from './types'
import { removeDir } from '../utils/remove-dir'
import path from 'path'
import { log } from '../logger'
import { getConfig } from '../config'

async function handleGeneratorOutputValue(outputDir: string) {
  // create the output directory and delete contents that might exist from a previous run
  const schemaDir = path.join(outputDir, 'schemas')
  await fs.mkdir(schemaDir, { recursive: true })
  await removeDir(schemaDir, true)

  Transformer.setOutputPath(outputDir)
}

async function generateEnumSchemas(prismaSchemaEnum: DMMF.SchemaEnum[], modelSchemaEnum: DMMF.SchemaEnum[]) {
  const enumTypes = [...prismaSchemaEnum, ...modelSchemaEnum]
  const enumNames = enumTypes.map((enumItem) => enumItem.name)
  Transformer.enumNames = enumNames ?? []
  const transformer = new Transformer({
    enumTypes,
  })
  await transformer.generateEnumSchemas()
}

async function generateObjectSchemas(inputObjectTypes: DMMF.InputType[], useBigInt: boolean) {
  for (let i = 0; i < inputObjectTypes.length; i += 1) {
    const fields = inputObjectTypes[i]?.fields
    const name = inputObjectTypes[i]?.name
    const transformer = new Transformer({ name, fields })
    await transformer.generateObjectSchema(useBigInt)
  }
}

async function generateModelSchemas(
  models: DMMF.Model[],
  modelOperations: DMMF.ModelMapping[],
  aggregateOperationSupport: AggregateOperationSupport
) {
  const transformer = new Transformer({
    models,
    modelOperations,
    aggregateOperationSupport,
  })
  await transformer.generateModelSchemas()
}

async function generateIndex() {
  await Transformer.generateIndex()
}

export async function generateZod(options: GeneratorOptions) {
  try {
    const { outputDir, prismaClientOutputPath, previewFeatures, useBigInt } = getConfig(options)

    await handleGeneratorOutputValue(outputDir)

    const prismaClientDmmf = await getDMMF({
      datamodel: options.datamodel,
      previewFeatures: previewFeatures,
    })

    Transformer.setPrismaClientOutputPath(prismaClientOutputPath)

    const modelOperations = prismaClientDmmf.mappings.modelOperations
    const inputObjectTypes = prismaClientDmmf.schema.inputObjectTypes.prisma
    const outputObjectTypes = prismaClientDmmf.schema.outputObjectTypes.prisma
    const enumTypes = prismaClientDmmf.schema.enumTypes
    const models: DMMF.Model[] = prismaClientDmmf.datamodel.models
    const hiddenModels: string[] = []
    const hiddenFields: string[] = []
    resolveModelsComments(models, modelOperations, enumTypes, hiddenModels, hiddenFields)

    await generateEnumSchemas(prismaClientDmmf.schema.enumTypes.prisma, prismaClientDmmf.schema.enumTypes.model ?? [])

    const dataSource = options.datasources?.[0]
    Transformer.provider = dataSource.provider
    Transformer.previewFeatures = previewFeatures

    const generatorConfigOptions = options.generator.config

    const addMissingInputObjectTypeOptions = resolveAddMissingInputObjectTypeOptions(generatorConfigOptions)
    addMissingInputObjectTypes(
      inputObjectTypes,
      outputObjectTypes,
      models,
      modelOperations,
      dataSource.provider,
      addMissingInputObjectTypeOptions
    )

    const aggregateOperationSupport = resolveAggregateOperationSupport(inputObjectTypes)

    hideInputObjectTypesAndRelatedFields(inputObjectTypes, hiddenModels, hiddenFields)

    await generateObjectSchemas(inputObjectTypes, useBigInt)
    await generateModelSchemas(models, modelOperations, aggregateOperationSupport)
    await generateIndex()
  } catch (error) {
    log.error(error)
  }
}
