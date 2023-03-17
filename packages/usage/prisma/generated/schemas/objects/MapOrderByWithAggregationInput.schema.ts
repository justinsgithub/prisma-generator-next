import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { MapCountOrderByAggregateInputObjectSchema } from './MapCountOrderByAggregateInput.schema'
import { MapMaxOrderByAggregateInputObjectSchema } from './MapMaxOrderByAggregateInput.schema'
import { MapMinOrderByAggregateInputObjectSchema } from './MapMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.MapOrderByWithAggregationInput> = z
  .object({
    key: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => MapCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => MapMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => MapMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const MapOrderByWithAggregationInputObjectSchema = Schema
