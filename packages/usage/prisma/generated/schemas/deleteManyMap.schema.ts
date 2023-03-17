import { z } from 'zod'
import { MapWhereInputObjectSchema } from './objects/MapWhereInput.schema'

export const MapDeleteManySchema = z.object({ where: MapWhereInputObjectSchema.optional() })
