import { z } from 'zod'
import { UserUpdateWithoutBooksInputObjectSchema } from './UserUpdateWithoutBooksInput.schema'
import { UserUncheckedUpdateWithoutBooksInputObjectSchema } from './UserUncheckedUpdateWithoutBooksInput.schema'
import { UserCreateWithoutBooksInputObjectSchema } from './UserCreateWithoutBooksInput.schema'
import { UserUncheckedCreateWithoutBooksInputObjectSchema } from './UserUncheckedCreateWithoutBooksInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpsertWithoutBooksInput> = z
  .object({
    update: z.union([z.lazy(() => UserUpdateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBooksInputObjectSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBooksInputObjectSchema)]),
  })
  .strict()

export const UserUpsertWithoutBooksInputObjectSchema = Schema
