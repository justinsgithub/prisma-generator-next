import { z } from 'zod'
import { BookCreateWithoutAuthorInputObjectSchema } from './BookCreateWithoutAuthorInput.schema'
import { BookUncheckedCreateWithoutAuthorInputObjectSchema } from './BookUncheckedCreateWithoutAuthorInput.schema'
import { BookCreateOrConnectWithoutAuthorInputObjectSchema } from './BookCreateOrConnectWithoutAuthorInput.schema'
import { BookWhereUniqueInputObjectSchema } from './BookWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookCreateNestedManyWithoutAuthorInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => BookCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => BookCreateWithoutAuthorInputObjectSchema).array(),
        z.lazy(() => BookUncheckedCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => BookUncheckedCreateWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => BookCreateOrConnectWithoutAuthorInputObjectSchema),
        z.lazy(() => BookCreateOrConnectWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connect: z.union([z.lazy(() => BookWhereUniqueInputObjectSchema), z.lazy(() => BookWhereUniqueInputObjectSchema).array()]).optional(),
  })
  .strict()

export const BookCreateNestedManyWithoutAuthorInputObjectSchema = Schema
