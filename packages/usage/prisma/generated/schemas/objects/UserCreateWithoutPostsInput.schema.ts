import { z } from 'zod'
import { BookCreateNestedManyWithoutAuthorInputObjectSchema } from './BookCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z
  .object({
    email: z.string(),
    name: z.string().optional().nullable(),
    books: z.lazy(() => BookCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict()

export const UserCreateWithoutPostsInputObjectSchema = Schema
