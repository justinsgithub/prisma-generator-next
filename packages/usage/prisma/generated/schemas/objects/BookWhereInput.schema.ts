import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => BookWhereInputObjectSchema), z.lazy(() => BookWhereInputObjectSchema).array()]).optional(),
    OR: z
      .lazy(() => BookWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => BookWhereInputObjectSchema), z.lazy(() => BookWhereInputObjectSchema).array()]).optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    authorId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    author: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const BookWhereInputObjectSchema = Schema
