import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookScalarWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => BookScalarWhereInputObjectSchema), z.lazy(() => BookScalarWhereInputObjectSchema).array()]).optional(),
    OR: z
      .lazy(() => BookScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => BookScalarWhereInputObjectSchema), z.lazy(() => BookScalarWhereInputObjectSchema).array()]).optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    authorId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict()

export const BookScalarWhereInputObjectSchema = Schema
