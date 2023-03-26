import { EnvValue, GeneratorConfig, GeneratorOptions } from '@prisma/generator-helper'
import { parseEnvValue } from '@prisma/internals'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { log } from './logger'
import { project } from './utils/project'

const configBoolean = z.enum(['true', 'false'])

/**
   options to specify in schema.prisma
  prismaFilePath: z.string().optional(),
  prismaVarName: z.string().default('prisma'),
  apiRoutePrefix: z.string().default('pgen'), // pages/api/pgen/${modelName}
  outputSuffix: z.string().default('pgen'), // output/pgen/${generatedFiles}
  useBigInt: configBoolean.default('false'),
*/
const configSchema = z.object({
  prismaFilePath: z.string().optional(),
  prismaVarName: z.string().default('prisma'),
  apiRoutePrefix: z.string().default('pgen'), /** pages/api/pgen/${modelName} */
  outputSuffix: z.string().default('pgen'), /** output/pgen/${generatedFiles} */
  useBigInt: configBoolean.default('false'),
})

export type Config = z.infer<typeof configSchema>

interface UserPrisma {
  userPrismaPath: string | null
  isDefaultExport: boolean
}

interface CheckUserPrisma {
  customPrismaFilePath?: string
  prismaVarName: string
  schemaPath: string
  outputDir: string
}

function checkUserPrisma({ customPrismaFilePath, prismaVarName, schemaPath, outputDir }: CheckUserPrisma): UserPrisma {
  const p: UserPrisma = { userPrismaPath: null, isDefaultExport: false }
  if (!customPrismaFilePath) return p
  const resolvedPath = path.resolve(path.dirname(schemaPath), customPrismaFilePath)
  const prismaFile = project.addSourceFileAtPathIfExists(resolvedPath)
  const defaultMessage = `using default prismaFilePath ${path.join(outputDir, 'backend', 'db')} instead`

  if (!prismaFile) {
    log.error(`prismaFilePath ${resolvedPath} not found`)
    log.info(defaultMessage)
    return p
  }
  const isPrismaVar = prismaFile.getVariableDeclaration(prismaVarName)
  if (!isPrismaVar) {
    log.error(`${prismaVarName} not found in ${resolvedPath}`)
    log.info(defaultMessage)
    return p
  }
  p.userPrismaPath = resolvedPath
  if (isPrismaVar.isDefaultExport()) p.isDefaultExport = true
  return p
}

function getGeneratorConfigByProvider(generators: GeneratorConfig[], provider: string): GeneratorConfig | undefined {
  return generators.find((it) => parseEnvValue(it.provider) === provider)
}

export function getPrismaClientOutputPath(prismaClientGeneratorConfig: GeneratorConfig | undefined) {
  if (prismaClientGeneratorConfig?.isCustomOutput) return prismaClientGeneratorConfig.output?.value as string
  return '@prisma/client'
}

type GetConfig = {
  outputDir: string
  prismaClientOutputPath: string
  useBigInt: boolean
  prismaVarName: string
  apiPath: string
  previewFeatures: string[] | undefined
  prismaFilePath: string
  isDefaultExport: boolean
}

export function getConfig(options: GeneratorOptions): GetConfig {
  const prismaClientGeneratorConfig = getGeneratorConfigByProvider(options.otherGenerators, 'prisma-client-js')
  const prismaClientOutputPath = getPrismaClientOutputPath(prismaClientGeneratorConfig)
  const previewFeatures = prismaClientGeneratorConfig?.previewFeatures
  const schemaPath = options.schemaPath
  const configTest = configSchema.safeParse(options.generator.config)
  if (!configTest.success) throw new Error('Invalid generator options passed')
  const { prismaVarName } = configTest.data
  const customPrismaFilePath = configTest.data.prismaFilePath
  const apiPrefix = configTest.data.apiRoutePrefix
  const useBigInt = configTest.data.useBigInt === 'false' ? false : true

  const output = parseEnvValue(options.generator.output as EnvValue)
  const outputSuffix = configTest.data.outputSuffix
  const outputDir = path.join(path.resolve(output), outputSuffix)

  const { userPrismaPath, isDefaultExport } = checkUserPrisma({
    customPrismaFilePath,
    prismaVarName,
    schemaPath,
    outputDir,
  })
  const prismaFilePath = userPrismaPath ? userPrismaPath : path.resolve(path.join(outputDir, 'backend', 'db.ts'))

  let apiPath = ''

  if (fs.existsSync('pages')) {
    apiPath = path.join('pages', 'api', apiPrefix)
  } else {
    apiPath = path.join('src', 'pages', 'api', apiPrefix)
  }

  return {
    apiPath,
    prismaFilePath,
    previewFeatures,
    isDefaultExport,
    prismaClientOutputPath,
    prismaVarName,
    outputDir,
    useBigInt
  }
}
