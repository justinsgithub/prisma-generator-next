import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema'
import { BookOrderByRelationAggregateInputObjectSchema } from './BookOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    posts: z.lazy(() => PostOrderByRelationAggregateInputObjectSchema).optional(),
    books: z.lazy(() => BookOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict()

export const UserOrderByWithRelationInputObjectSchema = Schema
