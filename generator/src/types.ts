// TODO: add count op (zod generator does not support)

export const modelOperations = [
  'findUniqueOrThrow',
  'findUnique',
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
  'groupBy',
  'aggregate',
  'findRaw',
  'aggregateRaw',
]

export interface PgenFiles {
  types: string
  validate: string
  schemas: string
  apiRoutes: { modelName: string; apiRoute: string | null }[]
  index: string | null
  db: string | null
  middleware: string | null
}
