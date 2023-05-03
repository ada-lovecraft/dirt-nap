import prisma from '../lib/prisma.js'
import { Router } from 'express'
const router = Router()

const getAll = (req, res) => prisma.site.findMany()
const getOne = (req, res) =>
  prisma.site.findUniqueOrThrow({ where: { id: req.params.id } })

const create = (req, res) => prisma.site.create({ data: req.body })

const update = async (req) => {
  const ov = await getOne(req)
  const nv = { ...ov, ...req.body }
  return prisma.site.update({ data: nv, where: { id: req.params.id } })
}
const remove = (req, res) =>
  prisma.site.delete({ where: { id: req.params.id } })

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}
