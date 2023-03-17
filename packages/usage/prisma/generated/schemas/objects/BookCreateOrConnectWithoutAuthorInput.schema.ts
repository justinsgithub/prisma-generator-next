import { z } from 'zod'
import { BookWhereUniqueInputObjectSchema } from './BookWhereUniqueInput.schema'
import { BookCreateWithoutAuthorInputObjectSchema } from './BookCreateWithoutAuthorInput.schema'
import { BookUncheckedCreateWithoutAuthorInputObjectSchema } from './BookUncheckedCreateWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookCreateOrConnectWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => BookWhereUniqueInputObjectSchema),
    create: z.union([z.lazy(() => BookCreateWithoutAuthorInputObjectSchema), z.lazy(() => BookUncheckedCreateWithoutAuthorInputObjectSchema)]),
  })
  .strict()

export const BookCreateOrConnectWithoutAuthorInputObjectSchema = Schema
