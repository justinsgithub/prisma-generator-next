import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './BookWhereUniqueInput.schema'
import { BookUpdateWithoutAuthorInputObjectSchema } from './BookUpdateWithoutAuthorInput.schema'
import { BookUncheckedUpdateWithoutAuthorInputObjectSchema } from './BookUncheckedUpdateWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUpdateWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => BookWhereUniqueInputObjectSchema),
    data: z.union([z.lazy(() => BookUpdateWithoutAuthorInputObjectSchema), z.lazy(() => BookUncheckedUpdateWithoutAuthorInputObjectSchema)]),
  })
  .strict()

export const BookUpdateWithWhereUniqueWithoutAuthorInputObjectSchema = Schema
