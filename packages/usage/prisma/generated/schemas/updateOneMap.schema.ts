import { z } from 'zod'
import { MapUpdateInputObjectSchema } from './objects/MapUpdateInput.schema'
import { MapUncheckedUpdateInputObjectSchema } from './objects/MapUncheckedUpdateInput.schema'
import { MapWhereUniqueInputObjectSchema } from './objects/MapWhereUniqueInput.schema'

export const MapUpdateOneSchema = z.object({
  data: z.union([MapUpdateInputObjectSchema, MapUncheckedUpdateInputObjectSchema]),
  where: MapWhereUniqueInputObjectSchema,
})
