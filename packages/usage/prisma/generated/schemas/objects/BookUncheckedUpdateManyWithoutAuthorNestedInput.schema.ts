import { z } from 'zod'
import { BookCreateWithoutAuthorInputObjectSchema } from './BookCreateWithoutAuthorInput.schema'
import { BookUncheckedCreateWithoutAuthorInputObjectSchema } from './BookUncheckedCreateWithoutAuthorInput.schema'
import { BookCreateOrConnectWithoutAuthorInputObjectSchema } from './BookCreateOrConnectWithoutAuthorInput.schema'
import { BookUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './BookUpsertWithWhereUniqueWithoutAuthorInput.schema'
import { BookWhereUniqueInputObjectSchema } from './BookWhereUniqueInput.schema'
import { BookUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './BookUpdateWithWhereUniqueWithoutAuthorInput.schema'
import { BookUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './BookUpdateManyWithWhereWithoutAuthorInput.schema'
import { BookScalarWhereInputObjectSchema } from './BookScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BookUncheckedUpdateManyWithoutAuthorNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => BookUpsertWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    set: z.union([z.lazy(() => BookWhereUniqueInputObjectSchema), z.lazy(() => BookWhereUniqueInputObjectSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => BookWhereUniqueInputObjectSchema), z.lazy(() => BookWhereUniqueInputObjectSchema).array()]).optional(),
    delete: z.union([z.lazy(() => BookWhereUniqueInputObjectSchema), z.lazy(() => BookWhereUniqueInputObjectSchema).array()]).optional(),
    connect: z.union([z.lazy(() => BookWhereUniqueInputObjectSchema), z.lazy(() => BookWhereUniqueInputObjectSchema).array()]).optional(),
    update: z
      .union([
        z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => BookUpdateWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputObjectSchema),
        z.lazy(() => BookUpdateManyWithWhereWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z.union([z.lazy(() => BookScalarWhereInputObjectSchema), z.lazy(() => BookScalarWhereInputObjectSchema).array()]).optional(),
  })
  .strict()

export const BookUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema = Schema
