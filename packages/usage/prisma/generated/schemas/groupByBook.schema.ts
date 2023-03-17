import { z } from 'zod'
import { BookWhereInputObjectSchema } from './objects/BookWhereInput.schema'
import { BookOrderByWithAggregationInputObjectSchema } from './objects/BookOrderByWithAggregationInput.schema'
import { BookScalarWhereWithAggregatesInputObjectSchema } from './objects/BookScalarWhereWithAggregatesInput.schema'
import { BookScalarFieldEnumSchema } from './enums/BookScalarFieldEnum.schema'

export const BookGroupBySchema = z.object({
  where: BookWhereInputObjectSchema.optional(),
  orderBy: z.union([BookOrderByWithAggregationInputObjectSchema, BookOrderByWithAggregationInputObjectSchema.array()]).optional(),
  having: BookScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(BookScalarFieldEnumSchema),
})
