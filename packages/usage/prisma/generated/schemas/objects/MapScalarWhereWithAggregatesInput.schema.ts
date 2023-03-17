import { z } from 'zod'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([z.lazy(() => MapScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MapScalarWhereWithAggregatesInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => MapScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => MapScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MapScalarWhereWithAggregatesInputObjectSchema).array()])
      .optional(),
    key: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    value: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  })
  .strict()

export const MapScalarWhereWithAggregatesInputObjectSchema = Schema
