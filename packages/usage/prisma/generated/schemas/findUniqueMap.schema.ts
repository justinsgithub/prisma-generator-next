import { z } from 'zod'
import { MapWhereUniqueInputObjectSchema } from './objects/MapWhereUniqueInput.schema'

export const MapFindUniqueSchema = z.object({ where: MapWhereUniqueInputObjectSchema })
