import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './objects/BookWhereUniqueInput.schema'

export const BookDeleteOneSchema = z.object({ where: BookWhereUniqueInputObjectSchema })
