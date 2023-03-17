import { z } from 'zod'
import { UserCreateNestedOneWithoutBooksInputObjectSchema } from './UserCreateNestedOneWithoutBooksInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookCreateInput> = z
  .object({
    id: z.number(),
    title: z.string(),
    author: z.lazy(() => UserCreateNestedOneWithoutBooksInputObjectSchema).optional(),
  })
  .strict()

export const BookCreateInputObjectSchema = Schema
