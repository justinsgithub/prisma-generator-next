import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './objects/BookWhereUniqueInput.schema'
import { BookCreateInputObjectSchema } from './objects/BookCreateInput.schema'
import { BookUncheckedCreateInputObjectSchema } from './objects/BookUncheckedCreateInput.schema'
import { BookUpdateInputObjectSchema } from './objects/BookUpdateInput.schema'
import { BookUncheckedUpdateInputObjectSchema } from './objects/BookUncheckedUpdateInput.schema'

export const BookUpsertSchema = z.object({
  where: BookWhereUniqueInputObjectSchema,
  create: z.union([BookCreateInputObjectSchema, BookUncheckedCreateInputObjectSchema]),
  update: z.union([BookUpdateInputObjectSchema, BookUncheckedUpdateInputObjectSchema]),
})
