import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUncheckedCreateInput> = z
  .object({
    id: z.number(),
    title: z.string(),
    authorId: z.number().optional().nullable(),
  })
  .strict()

export const BookUncheckedCreateInputObjectSchema = Schema
