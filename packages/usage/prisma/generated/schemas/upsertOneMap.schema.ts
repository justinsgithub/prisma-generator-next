import { z } from 'zod'
import { MapWhereUniqueInputObjectSchema } from './objects/MapWhereUniqueInput.schema'
import { MapCreateInputObjectSchema } from './objects/MapCreateInput.schema'
import { MapUncheckedCreateInputObjectSchema } from './objects/MapUncheckedCreateInput.schema'
import { MapUpdateInputObjectSchema } from './objects/MapUpdateInput.schema'
import { MapUncheckedUpdateInputObjectSchema } from './objects/MapUncheckedUpdateInput.schema'

export const MapUpsertSchema = z.object({
  where: MapWhereUniqueInputObjectSchema,
  create: z.union([MapCreateInputObjectSchema, MapUncheckedCreateInputObjectSchema]),
  update: z.union([MapUpdateInputObjectSchema, MapUncheckedUpdateInputObjectSchema]),
})
