import { z } from 'zod'
import { MapWhereInputObjectSchema } from './objects/MapWhereInput.schema'
import { MapOrderByWithAggregationInputObjectSchema } from './objects/MapOrderByWithAggregationInput.schema'
import { MapScalarWhereWithAggregatesInputObjectSchema } from './objects/MapScalarWhereWithAggregatesInput.schema'
import { MapScalarFieldEnumSchema } from './enums/MapScalarFieldEnum.schema'

export const MapGroupBySchema = z.object({
  where: MapWhereInputObjectSchema.optional(),
  orderBy: z.union([MapOrderByWithAggregationInputObjectSchema, MapOrderByWithAggregationInputObjectSchema.array()]).optional(),
  having: MapScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(MapScalarFieldEnumSchema),
})
