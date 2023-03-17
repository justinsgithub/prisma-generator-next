import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapCreateInput> = z
  .object({
    key: z.string(),
    value: z.string(),
  })
  .strict()

export const MapCreateInputObjectSchema = Schema
