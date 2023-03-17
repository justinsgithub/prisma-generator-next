import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './BookWhereUniqueInput.schema'
import { BookUpdateWithoutAuthorInputObjectSchema } from './BookUpdateWithoutAuthorInput.schema'
import { BookUncheckedUpdateWithoutAuthorInputObjectSchema } from './BookUncheckedUpdateWithoutAuthorInput.schema'
import { BookCreateWithoutAuthorInputObjectSchema } from './BookCreateWithoutAuthorInput.schema'
import { BookUncheckedCreateWithoutAuthorInputObjectSchema } from './BookUncheckedCreateWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUpsertWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => BookWhereUniqueInputObjectSchema),
    update: z.union([z.lazy(() => BookUpdateWithoutAuthorInputObjectSchema), z.lazy(() => BookUncheckedUpdateWithoutAuthorInputObjectSchema)]),
    create: z.union([z.lazy(() => BookCreateWithoutAuthorInputObjectSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorInputObjectSchema)]),
  })
  .strict()

export const BookUpsertWithWhereUniqueWithoutAuthorInputObjectSchema = Schema
