import { z } from 'zod'
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedFloatFilterObjectSchema } from './NestedFloatFilter.schema'
import { NestedBigIntFilterObjectSchema } from './NestedBigIntFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedBigIntWithAggregatesFilterObjectSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBigIntFilterObjectSchema).optional(),
  })
  .strict()

export const NestedBigIntWithAggregatesFilterObjectSchema = Schema
