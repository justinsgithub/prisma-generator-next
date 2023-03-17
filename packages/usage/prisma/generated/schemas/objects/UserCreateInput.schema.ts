import { z } from 'zod'
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema'
import { BookCreateNestedManyWithoutAuthorInputObjectSchema } from './BookCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    email: z.string(),
    name: z.string().optional().nullable(),
    posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    books: z.lazy(() => BookCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict()

export const UserCreateInputObjectSchema = Schema
