import { z } from 'zod'
import { MapOrderByWithRelationInputObjectSchema } from './objects/MapOrderByWithRelationInput.schema'
import { MapWhereInputObjectSchema } from './objects/MapWhereInput.schema'
import { MapWhereUniqueInputObjectSchema } from './objects/MapWhereUniqueInput.schema'
import { MapCountAggregateInputObjectSchema } from './objects/MapCountAggregateInput.schema'
import { MapMinAggregateInputObjectSchema } from './objects/MapMinAggregateInput.schema'
import { MapMaxAggregateInputObjectSchema } from './objects/MapMaxAggregateInput.schema'

export const MapAggregateSchema = z.object({
  orderBy: z.union([MapOrderByWithRelationInputObjectSchema, MapOrderByWithRelationInputObjectSchema.array()]).optional(),
  where: MapWhereInputObjectSchema.optional(),
  cursor: MapWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), MapCountAggregateInputObjectSchema]).optional(),
  _min: MapMinAggregateInputObjectSchema.optional(),
  _max: MapMaxAggregateInputObjectSchema.optional(),
})
