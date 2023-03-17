import { z } from 'zod'
import { MapUpdateManyMutationInputObjectSchema } from './objects/MapUpdateManyMutationInput.schema'
import { MapWhereInputObjectSchema } from './objects/MapWhereInput.schema'

export const MapUpdateManySchema = z.object({ data: MapUpdateManyMutationInputObjectSchema, where: MapWhereInputObjectSchema.optional() })
