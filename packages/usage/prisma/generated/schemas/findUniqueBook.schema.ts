import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './objects/BookWhereUniqueInput.schema'

export const BookFindUniqueSchema = z.object({ where: BookWhereUniqueInputObjectSchema })
