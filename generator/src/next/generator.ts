import { GeneratorConfig, generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { getConfig } from '../config'
import { log } from '../logger'
import { apiTemplate, dbTemplate, indexTemplate, middlewareTemplate, typesTemplate, validateTemplate } from '../templates/backend'
import { resolveModelsComments } from '../utils/resolve-comments'
import { getPgenFiles, writePgenFiles } from '../utils/write-files'
import { generateZod } from '../zod'

const onManifest = (_config: GeneratorConfig) => {
  return {
    defaultOutput: './',
    prettyName: 'Prisma Next.JS',
    requiresGenerators: ['prisma-client-js'], // for zod generator
  }
}

const onGenerate = async (options: GeneratorOptions) => {
  try {
    const { apiPath, isDefaultExport, prismaClientOutputPath, prismaFilePath, prismaVarName, outputDir } = getConfig(options)

    await generateZod(options)

    const hiddenModels = resolveModelsComments(options.dmmf.datamodel.models)

    // to follow prisma-zod-generator practices
    const modelMappings = options.dmmf.mappings.modelOperations.filter((op) => !hiddenModels.includes(op.model))

    const modelNames = modelMappings.map((mapping) => mapping.model)

    const files = getPgenFiles(apiPath, modelNames, prismaFilePath, outputDir)

    const { index: indexFilePath, middleware: middlewarePath, db: dbPath } = files

    const dataSource = options.datasources[0] // safe to assume first item in Array is the main datasource we will be using ?

    const provider = dataSource.provider

    const indexParams = { isDefaultExport, indexFilePath, prismaFilePath, prismaVarName }

    const db = dbTemplate(prismaClientOutputPath, dbPath)

    const index = indexTemplate(indexParams)

    const middleware = middlewareTemplate({provider, prismaClientOutputPath, middlewarePath})

    const types = typesTemplate(modelMappings)

    const validate = validateTemplate(modelNames, provider, outputDir)

    const apiParams = { isDefaultExport, apiPath, prismaVarName, provider }

    const routes = files.apiRoutes

    const apiRoutes = routes.map((route) => ({
      ...route,
      content: apiTemplate({ ...apiParams, modelName: route.modelName, outputDir }),
    }))

    const content = {
      db,
      index,
      middleware,
      types,
      validate,
      apiRoutes,
    }

    await writePgenFiles(files, content)
  } catch (error) {
    log.error('ERROR', error)
  }
}

generatorHandler({
  onManifest,
  onGenerate,
})
