import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapWhereUniqueInput> = z
  .object({
    key: z.string().optional(),
  })
  .strict()

export const MapWhereUniqueInputObjectSchema = Schema
