import { z } from 'zod'
import { UserCreateWithoutBooksInputObjectSchema } from './UserCreateWithoutBooksInput.schema'
import { UserUncheckedCreateWithoutBooksInputObjectSchema } from './UserUncheckedCreateWithoutBooksInput.schema'
import { UserCreateOrConnectWithoutBooksInputObjectSchema } from './UserCreateOrConnectWithoutBooksInput.schema'
import { UserUpsertWithoutBooksInputObjectSchema } from './UserUpsertWithoutBooksInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutBooksInputObjectSchema } from './UserUpdateWithoutBooksInput.schema'
import { UserUncheckedUpdateWithoutBooksInputObjectSchema } from './UserUncheckedUpdateWithoutBooksInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutBooksNestedInput> = z
  .object({
    create: z
      .union([z.lazy(() => UserCreateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBooksInputObjectSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBooksInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutBooksInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([z.lazy(() => UserUpdateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBooksInputObjectSchema)])
      .optional(),
  })
  .strict()

export const UserUpdateOneWithoutBooksNestedInputObjectSchema = Schema
