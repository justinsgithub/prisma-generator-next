import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => MapWhereInputObjectSchema), z.lazy(() => MapWhereInputObjectSchema).array()]).optional(),
    OR: z
      .lazy(() => MapWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => MapWhereInputObjectSchema), z.lazy(() => MapWhereInputObjectSchema).array()]).optional(),
    key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    value: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict()

export const MapWhereInputObjectSchema = Schema
