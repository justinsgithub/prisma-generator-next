import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapMaxAggregateInputType> = z
  .object({
    key: z.literal(true).optional(),
    value: z.literal(true).optional(),
  })
  .strict()

export const MapMaxAggregateInputObjectSchema = Schema
