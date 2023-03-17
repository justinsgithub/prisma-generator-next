import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutBooksInputObjectSchema } from './UserCreateWithoutBooksInput.schema'
import { UserUncheckedCreateWithoutBooksInputObjectSchema } from './UserUncheckedCreateWithoutBooksInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutBooksInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([z.lazy(() => UserCreateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBooksInputObjectSchema)]),
  })
  .strict()

export const UserCreateOrConnectWithoutBooksInputObjectSchema = Schema
