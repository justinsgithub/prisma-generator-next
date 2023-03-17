import { z } from 'zod'
import { BookUpdateInputObjectSchema } from './objects/BookUpdateInput.schema'
import { BookUncheckedUpdateInputObjectSchema } from './objects/BookUncheckedUpdateInput.schema'
import { BookWhereUniqueInputObjectSchema } from './objects/BookWhereUniqueInput.schema'

export const BookUpdateOneSchema = z.object({
  data: z.union([BookUpdateInputObjectSchema, BookUncheckedUpdateInputObjectSchema]),
  where: BookWhereUniqueInputObjectSchema,
})
