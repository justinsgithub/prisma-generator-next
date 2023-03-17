import { z } from 'zod'
import { BookUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './BookUncheckedCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z
  .object({
    id: z.number().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    books: z.lazy(() => BookUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutPostsInputObjectSchema = Schema
