import { z } from 'zod'
import { MapWhereUniqueInputObjectSchema } from './objects/MapWhereUniqueInput.schema'

export const MapDeleteOneSchema = z.object({ where: MapWhereUniqueInputObjectSchema })
