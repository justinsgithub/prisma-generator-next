import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUncheckedCreateWithoutAuthorInput> = z
  .object({
    id: z.number(),
    title: z.string(),
  })
  .strict()

export const BookUncheckedCreateWithoutAuthorInputObjectSchema = Schema
