import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { BookUpdateManyWithoutAuthorNestedInputObjectSchema } from './BookUpdateManyWithoutAuthorNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z
  .object({
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    books: z.lazy(() => BookUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
  })
  .strict()

export const UserUpdateWithoutPostsInputObjectSchema = Schema
