import { z } from 'zod'
import { MapCreateInputObjectSchema } from './objects/MapCreateInput.schema'
import { MapUncheckedCreateInputObjectSchema } from './objects/MapUncheckedCreateInput.schema'

export const MapCreateOneSchema = z.object({ data: z.union([MapCreateInputObjectSchema, MapUncheckedCreateInputObjectSchema]) })
