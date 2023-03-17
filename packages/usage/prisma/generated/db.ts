/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
/* this file is only written if user file with prisma export is not found */

import { PrismaClient } from '@prisma/client'

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
