import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { BookCountOrderByAggregateInputObjectSchema } from './BookCountOrderByAggregateInput.schema'
import { BookAvgOrderByAggregateInputObjectSchema } from './BookAvgOrderByAggregateInput.schema'
import { BookMaxOrderByAggregateInputObjectSchema } from './BookMaxOrderByAggregateInput.schema'
import { BookMinOrderByAggregateInputObjectSchema } from './BookMinOrderByAggregateInput.schema'
import { BookSumOrderByAggregateInputObjectSchema } from './BookSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => BookCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => BookAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => BookMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => BookMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => BookSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const BookOrderByWithAggregationInputObjectSchema = Schema
