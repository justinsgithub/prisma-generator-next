import { z } from 'zod'
import { BookWhereInputObjectSchema } from './BookWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookListRelationFilter> = z
  .object({
    every: z.lazy(() => BookWhereInputObjectSchema).optional(),
    some: z.lazy(() => BookWhereInputObjectSchema).optional(),
    none: z.lazy(() => BookWhereInputObjectSchema).optional(),
  })
  .strict()

export const BookListRelationFilterObjectSchema = Schema
