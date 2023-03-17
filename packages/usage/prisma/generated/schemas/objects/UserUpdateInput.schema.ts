import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { PostUpdateManyWithoutAuthorNestedInputObjectSchema } from './PostUpdateManyWithoutAuthorNestedInput.schema'
import { BookUpdateManyWithoutAuthorNestedInputObjectSchema } from './BookUpdateManyWithoutAuthorNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
    books: z.lazy(() => BookUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
  })
  .strict()

export const UserUpdateInputObjectSchema = Schema
