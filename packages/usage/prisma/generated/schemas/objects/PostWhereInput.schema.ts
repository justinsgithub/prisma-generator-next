import { z } from 'zod'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema'
import { BigIntFilterObjectSchema } from './BigIntFilter.schema'
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema'
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
    OR: z
      .lazy(() => PostWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    content: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    published: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    viewCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    authorId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    likes: z.union([z.lazy(() => BigIntFilterObjectSchema), z.number()]).optional(),
    author: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict()

export const PostWhereInputObjectSchema = Schema
