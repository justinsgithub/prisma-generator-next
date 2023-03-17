import { z } from 'zod'
import { BookCreateInputObjectSchema } from './objects/BookCreateInput.schema'
import { BookUncheckedCreateInputObjectSchema } from './objects/BookUncheckedCreateInput.schema'

export const BookCreateOneSchema = z.object({ data: z.union([BookCreateInputObjectSchema, BookUncheckedCreateInputObjectSchema]) })
