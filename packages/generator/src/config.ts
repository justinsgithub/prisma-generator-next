import { EnvValue, GeneratorOptions } from '@prisma/generator-helper'
import { parseEnvValue } from '@prisma/internals'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { log } from './logger'
import { project } from './utils/project'

/* const configBoolean = z.enum(['true', 'false']).transform((arg) => JSON.parse(arg)) */

// options to specify in schema.prisma
const configSchema = z.object({
  prismaFilePath: z.string().optional(),
  prismaVarName: z.string().default('prisma'),
  /* useTS: configBoolean.default('true') */
  /* contextPath: z.string().default('../../../../src/context'), */
  /* trpcOptionsPath: z.string().optional(), */
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
  const defaultMessage = `using default prismaFilePath ${path.join(outputDir, 'db')} instead`

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

type GetConfig = {
  outputDir: string
  prismaVarName: string
  apiPath: string
  prismaFilePath: string
  isDefaultExport: boolean
}

export function getConfig(options: GeneratorOptions): GetConfig {
  console.log('GETTING CONFIG')
  const outputDir = parseEnvValue(options.generator.output as EnvValue)
  const schemaPath = options.schemaPath
  const configTest = configSchema.safeParse(options.generator.config)
  if (!configTest.success) throw new Error('Invalid generator options passed')
  const { prismaVarName } = configTest.data
  const customPrismaFilePath = configTest.data.prismaFilePath
  /* log.info('CUSTOM PRISMA FP', customPrismaFilePath) */

  const { userPrismaPath, isDefaultExport } = checkUserPrisma({
    customPrismaFilePath,
    prismaVarName,
    schemaPath,
    outputDir,
  })
  const prismaFilePath = userPrismaPath ? userPrismaPath : path.resolve(path.join(outputDir, 'db.ts'))

  let apiPath = ''

  if (fs.existsSync('pages')) {
    apiPath = path.join('pages', 'api', 'pgen')
  } else {
    apiPath = path.join('src', 'pages', 'api', 'pgen')
  }

  return { apiPath, prismaFilePath, isDefaultExport, prismaVarName, outputDir }
}
