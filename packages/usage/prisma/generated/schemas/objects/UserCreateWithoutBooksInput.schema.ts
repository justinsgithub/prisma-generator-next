import { z } from 'zod'
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateWithoutBooksInput> = z
  .object({
    email: z.string(),
    name: z.string().optional().nullable(),
    posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict()

export const UserCreateWithoutBooksInputObjectSchema = Schema
