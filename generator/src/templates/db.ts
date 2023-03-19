import { generateImportPrismaStatement } from '../utils/get-import-path'

export const dbTemplate = (prismaClientOutputPath: string, dbPath: string | null) => {
  if (!dbPath) return ''
  const importStatement = generateImportPrismaStatement(prismaClientOutputPath, dbPath, true)
  return `
/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
/* this file is only written if user file with prisma export is not found */
${importStatement}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env?.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env?.NODE_ENV !== 'production') {
  global.prisma = prisma
}
`
}
