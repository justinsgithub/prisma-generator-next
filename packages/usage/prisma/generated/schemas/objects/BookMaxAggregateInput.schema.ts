import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    title: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
  })
  .strict()

export const BookMaxAggregateInputObjectSchema = Schema
