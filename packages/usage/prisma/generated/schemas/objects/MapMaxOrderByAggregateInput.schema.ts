import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapMaxOrderByAggregateInput> = z
  .object({
    key: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict()

export const MapMaxOrderByAggregateInputObjectSchema = Schema
