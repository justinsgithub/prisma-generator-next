/* IMPORTANT: this file ***IS SAFE*** to edit, only written first time "prisma generate" is ran */
import type { NextApiHandler } from 'next'
import {
  prisma,
  useMiddleware,
} from '../../../../../../usage/prisma/generated/index'

const handler: NextApiHandler = async (req, res) => {
  // method, operation, and args should all be validated in middleware
  const method = req.method
  const operation = req.query.op
  const args = req.body
  if (method === 'POST') {
    if (operation === 'create')
      return res.status(201).send(await prisma.post.create(args))

    return res.status(201).send(await prisma.post.upsert(args))
  }

  if (method === 'GET') {
    if (operation === 'aggregate')
      return res.status(200).send(await prisma.post.aggregate(args))

    if (operation === 'findFirstOrThrow')
      return res.status(200).send(await prisma.post.findFirstOrThrow(args))
    if (operation === 'findMany')
      return res.status(200).send(await prisma.post.findMany(args))

    if (operation === 'findUnique')
      return res.status(200).send(await prisma.post.findUnique(args))
    if (operation === 'findUniqueOrThrow')
      return res.status(200).send(await prisma.post.findUniqueOrThrow(args))
    if (operation === 'groupBy')
      return res.status(200).send(await prisma.post.groupBy(args))
    return res.status(200).send(await prisma.post.findFirst(args))
  }

  if (method === 'PUT') {
    if (operation === 'update')
      return res.status(200).send(await prisma.post.update(args))
    if (operation === 'updateMany')
      return res.status(200).send(await prisma.post.updateMany(args))
    return res.status(200).send(await prisma.post.upsert(args))
  }

  if (method === 'DELETE') {
    if (operation === 'delete')
      return res.status(200).send(await prisma.post.delete(args))
    return res.status(200).send(await prisma.post.deleteMany(args))
  }

  // middleware performs all checks necessary to ensure one of the above conditions is met, or handles it otherwise
  return res
    .status(500)
    .send("MIDDLEWARE MALFUNCTION, THIS SHOULDN'T BE POSSIBLE")
}

export default useMiddleware({ model: 'User', handler })
