/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
import { Prisma } from '@prisma/client'
import { NextApiHandler } from 'next'
import { Middleware, use } from 'next-api-middleware'
import type { ModelOp, ModelName, ValidateOp } from './types'
import { validations } from './validate'

/*
  OPTIONS is standard HTTP method that returns 204 (No Content) with an "Allow" header containing allowed methods
  Allow: OPTIONS, PUT, POST
*/

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE' | 'PATCH'

type AllowedMethod = Exclude<HttpMethod, 'HEAD' | 'CONNECT' | 'TRACE' | 'PATCH'>

type OpMethod = Exclude<AllowedMethod, 'OPTIONS'>

export type PostOp = Extract<'create' | 'upsert', ModelOp>
export type GetOp = Exclude<ModelOp, PostOp | PutOp | DeleteOp>
export type PutOp = Extract<'update' | 'updateMany' | 'upsert', ModelOp>
export type DeleteOp = Extract<'delete' | 'deleteMany', ModelOp>

type OpMethodsType = Record<
  OpMethod,
  {
    all: PostOp[] | GetOp[] | PutOp[] | DeleteOp[]
    default: PostOp | GetOp | PutOp | DeleteOp
  }
>

export interface OpMethods extends OpMethodsType {
  POST: {
    all: PostOp[]
    default: PostOp
  }
  GET: {
    all: GetOp[]
    default: GetOp
  }
  PUT: {
    all: PutOp[]
    default: PutOp
  }
  DELETE: {
    all: DeleteOp[]
    default: DeleteOp
  }
}

const ops: OpMethods = {
  POST: {
    all: ['create', 'upsert'],
    default: 'create',
  },
  GET: {
    all: ['findFirst', 'findFirstOrThrow', 'findMany', 'findUnique', 'findUniqueOrThrow', 'aggregate', 'groupBy'],
    default: 'findFirst',
  },
  PUT: {
    all: ['update', 'updateMany', 'upsert'],
    default: 'update',
  },
  DELETE: {
    all: ['delete', 'deleteMany'],
    default: 'delete',
  },
}

// IMPORTANT: all Middleware must either call await next() or end response to avoid unwanted behavior
// try to run all other middleware and api-route code, handle any errors that are not accounted for
export const catchErrors: Middleware = async (req, res, next) => {
  try {
    await next()
  } catch (e) {
    const knownError = e instanceof Prisma.PrismaClientKnownRequestError
    const unknownError = e instanceof Prisma.PrismaClientUnknownRequestError
    const validationError = e instanceof Prisma.PrismaClientValidationError
    const anyPrismaErr = knownError || unknownError || validationError
    if (anyPrismaErr) {
      console.log('PRISMA ERROR NAME: ' + e.name + ' PRISMA ERROR MESSAGE: ' + e.message + ' PRISMA ERROR CAUSE: ' + e.cause)
      if (knownError) {
        console.log('PRISMA ERROR CODE: ' + e.code)
        // the client requested the record be deleted, if the record is not found, assume client is satisfied and it is not an error
        if (e.code === 'P2025' && req.method === 'DELETE') {
          res.status(204).end()
          return
        }
      }
    }
    !anyPrismaErr && console.log('UNKNOWN ERROR: ' + e)
    /* 
      status code will automatically set standard status messages, depending on res.status
      500 = 'Internal Server Error', 405 = 'Method Not Allowed', etc...
      const standardMessage = 'Internal Server Error'
      res.statusMessage = standardMessage 
    */
    // not necessary to send status message in response body, it is already set in headers from calling res.status(500)
    // res.send(standardMessage)
    res.status(500).end()
  }
}

const checkMethod: Middleware = async (req, res, next) => {
  const allowedMethods: AllowedMethod[] = ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']
  if (!req?.method || !allowedMethods.includes(req?.method as AllowedMethod)) {
    res.status(405).end()
    return
  }
  if (req?.method === 'OPTIONS') {
    res.status(204).setHeader('Allow', allowedMethods.join(', ')).end()
    return
  }
  await next()
}

const checkQueryOp: Middleware = async (req, res, next) => {
  const method = req.method as OpMethod // ensured by checkMethod middleware
  // if operation is undefined, set query.op to default operation depending on method
  if (req.query?.op === undefined) {
    req.query.op = ops[method].default
  }
  if (typeof req.query.op !== 'string') {
    return res.status(400).send('QUERY OP MUST BE OF TYPE STRING')
  }
  const allowedOps = ops[method].all as string[]
  if (!allowedOps.includes(req.query.op)) {
    return res.status(400).send('OPERATION ' + req.query.op + ' NOT ALLOWED FOR METHOD ' + method)
  }
  await next()
}

const checkQueryArgs: Middleware = async (req, res, next) => {
  const _args = req.query?.args
  if (req?.method !== 'GET') {
    if (_args) return res.status(400).send('QUERY ARGS (?args=) ONLY ALLOWED ON GET REQUESTS')
    return await next()
  }
  if (Array.isArray(_args)) {
    return res.status(400).send('QUERY ARGS MUST BE OF TYPE STRING, RECEIVED ARRAY')
  }
  if (!_args) {
    req.body = {}
    return await next()
  }
  try {
    const args = JSON.parse(_args)
    req.body = args
  } catch (error) {
    return res.status(400).send('ERROR JSON.PARSING QUERY ARGS ' + error)
  }
  await next()
}

// IMPORTANT: should be called after checkQueryOp and checkQueryArgs
const validateBody = (model: string): Middleware => {
  return async (req, res, next) => {
    // previous middleware validates op, OrThrow ops same as base op (findFirstOrThrow validation = findFirst validation)
    const _op = req.query.op as ModelOp
    const op = _op.replace('OrThrow', '') as ValidateOp
    const validator = validations[model as ModelName][op]
    const prismaArgs = req.body
    const isValid = validator.safeParse(prismaArgs)
    if (!isValid.success) {
      return res.status(400).send({ message: 'INVALID INPUT', zodError: isValid.error })
    }
    await next()
  }
}

const logStuff: Middleware = async (req, _res, next) => {
  const op = req.query?.op
  const args = req.query?.args
  const method = req.method
  const body = req.body
  console.log('OPERATION: ' + op + ' ARGS: ' + args + ' METHOD: ' + method + ' BODY: ' + JSON.stringify(body))
  await next()
}

/* IMPORTANT: assumed to be used in each newly generated api-route */
/* can still modify / customize / remove middleware from it as much as needed */
export const useMiddleware = ({ model, handler }: { model: string; handler: NextApiHandler }) => {
  const middleWare: Middleware[] = [catchErrors, checkMethod, checkQueryOp, checkQueryArgs, validateBody(model), logStuff]
  return use(middleWare)(handler)
}

/* 

MIDDLEWARE EXAMPLES

// example for authenticated routes (over-simplification)
const useAuth: Middleware = async (req, res, next) => {
  if (!req.cookies?._SESSION_ID) {
    res.status(401).end()
    return
  }
  await next()
}

const usePost = checkMethod(['POST', 'OPTIONS'])
const useGet = checkMethod(['GET', 'OPTIONS'])
const usePut = checkMethod(['PUT', 'OPTIONS'])
const useDelete = checkMethod(['DELETE', 'OPTIONS'])

const useAllMethods = checkMethod(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'])

export const withMiddleware = label({ catchUnknownErr, useGet, usePut, usePost, useDelete, useAllMethods, useAuth, checkQueryArgs })
export const withGet = withMiddleware('catchUnknownErr', 'useGet')
export const withPut = withMiddleware('catchUnknownErr', 'usePut', 'useAuth')
export const withPost = withMiddleware('catchUnknownErr', 'usePost', 'useAuth')
export const withDelete = withMiddleware('catchUnknownErr', 'useDelete', useAuth)

export const withAuth = withMiddleware('catchUnknownErr', 'useAuth')

export const withQueryArgs = withMiddleware('catchUnknownErr', 'useGet', 'checkQueryArgs')

*/

/*
 label() creates easy to use aliases for middlewares to help eliminate code duplication

 code updates can be done in one file as opposed to all files containing that same logic

 in api route file: call the return value of withMiddleware() and pass in api route handler as the argument

 export default withMiddleware('my', 'middleware', 'list')(myApihandler)

 export default withMiddleware('catchUnknownErr', 'useGet')((_req, res) => return res.send('api response using catchUnknownErr and useGet middleware'))
*/

/*
 just an example, not practical, same effect as useAllMethods^

 in api route file: withAllMethods is already the return value of withMiddleware(), so just call function with api handler as argument

 export default withAllMethods(myApihandler)

 export default withAllMethods((_req, res) => return res.send('api response using withAllMethods middleware'))
*/
