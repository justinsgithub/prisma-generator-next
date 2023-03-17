import { z } from 'zod'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([z.lazy(() => BookScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BookScalarWhereWithAggregatesInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => BookScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => BookScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BookScalarWhereWithAggregatesInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    authorId: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict()

export const BookScalarWhereWithAggregatesInputObjectSchema = Schema
