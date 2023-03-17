import { z } from 'zod'
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutAuthorInput.schema'
import { BookUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './BookUncheckedCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    books: z.lazy(() => BookUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateInputObjectSchema = Schema
