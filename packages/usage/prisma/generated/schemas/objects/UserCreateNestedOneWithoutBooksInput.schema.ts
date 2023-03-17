import { z } from 'zod'
import { UserCreateWithoutBooksInputObjectSchema } from './UserCreateWithoutBooksInput.schema'
import { UserUncheckedCreateWithoutBooksInputObjectSchema } from './UserUncheckedCreateWithoutBooksInput.schema'
import { UserCreateOrConnectWithoutBooksInputObjectSchema } from './UserCreateOrConnectWithoutBooksInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutBooksInput> = z
  .object({
    create: z
      .union([z.lazy(() => UserCreateWithoutBooksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBooksInputObjectSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBooksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict()

export const UserCreateNestedOneWithoutBooksInputObjectSchema = Schema
