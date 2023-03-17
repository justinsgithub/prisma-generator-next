/* IMPORTANT: this file ***IS NOT SAFE*** to edit, will be overwritten every time "prisma generate" is ran */
/* all files in ./prisma-zod directory will also be deleted / overwritten */
import * as schemas from './schemas'
import { ModelValidations } from './types'

export const validations: ModelValidations = {
  User: {
    aggregate: schemas.UserAggregateSchema,

    findFirst: schemas.UserFindFirstSchema,
    findMany: schemas.UserFindManySchema,

    findUnique: schemas.UserFindUniqueSchema,
    groupBy: schemas.UserGroupBySchema,
    create: schemas.UserCreateOneSchema,

    update: schemas.UserUpdateOneSchema,
    updateMany: schemas.UserUpdateManySchema,
    upsert: schemas.UserUpsertSchema,
    delete: schemas.UserDeleteOneSchema,
    deleteMany: schemas.UserDeleteManySchema,
  },
  Post: {
    aggregate: schemas.PostAggregateSchema,

    findFirst: schemas.PostFindFirstSchema,
    findMany: schemas.PostFindManySchema,

    findUnique: schemas.PostFindUniqueSchema,
    groupBy: schemas.PostGroupBySchema,
    create: schemas.PostCreateOneSchema,

    update: schemas.PostUpdateOneSchema,
    updateMany: schemas.PostUpdateManySchema,
    upsert: schemas.PostUpsertSchema,
    delete: schemas.PostDeleteOneSchema,
    deleteMany: schemas.PostDeleteManySchema,
  },
  Book: {
    aggregate: schemas.BookAggregateSchema,

    findFirst: schemas.BookFindFirstSchema,
    findMany: schemas.BookFindManySchema,

    findUnique: schemas.BookFindUniqueSchema,
    groupBy: schemas.BookGroupBySchema,
    create: schemas.BookCreateOneSchema,

    update: schemas.BookUpdateOneSchema,
    updateMany: schemas.BookUpdateManySchema,
    upsert: schemas.BookUpsertSchema,
    delete: schemas.BookDeleteOneSchema,
    deleteMany: schemas.BookDeleteManySchema,
  },
  Map: {
    aggregate: schemas.MapAggregateSchema,

    findFirst: schemas.MapFindFirstSchema,
    findMany: schemas.MapFindManySchema,

    findUnique: schemas.MapFindUniqueSchema,
    groupBy: schemas.MapGroupBySchema,
    create: schemas.MapCreateOneSchema,

    update: schemas.MapUpdateOneSchema,
    updateMany: schemas.MapUpdateManySchema,
    upsert: schemas.MapUpsertSchema,
    delete: schemas.MapDeleteOneSchema,
    deleteMany: schemas.MapDeleteManySchema,
  },
}
