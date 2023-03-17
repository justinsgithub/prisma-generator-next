import { z } from 'zod'
import { BookScalarWhereInputObjectSchema } from './BookScalarWhereInput.schema'
import { BookUpdateManyMutationInputObjectSchema } from './BookUpdateManyMutationInput.schema'
import { BookUncheckedUpdateManyWithoutBooksInputObjectSchema } from './BookUncheckedUpdateManyWithoutBooksInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUpdateManyWithWhereWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => BookScalarWhereInputObjectSchema),
    data: z.union([z.lazy(() => BookUpdateManyMutationInputObjectSchema), z.lazy(() => BookUncheckedUpdateManyWithoutBooksInputObjectSchema)]),
  })
  .strict()

export const BookUpdateManyWithWhereWithoutAuthorInputObjectSchema = Schema
