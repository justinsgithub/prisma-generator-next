/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
import { serialize } from 'superjson'
import { prisma } from './db'
import { useMiddleware } from './middleware'

// needed in order to work with js-incompatible types such as BigInt
prisma.$use(async (params, next) => {
  // prisma.$use is how you add middleware for prisma (ran before and after database interactions, separate from api-route middleware)
  const _result = await next(params)
  const result = serialize(_result)
  return result.json
})

/* IMPORTANT: these exports are assumed to be exported from this file in newly-generated api-routes */
/* can still modify / customize / remove functionality and middleware from them as much as needed */
export { prisma, useMiddleware }
