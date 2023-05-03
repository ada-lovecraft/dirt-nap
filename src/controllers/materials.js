import prisma from '../lib/prisma.js'

const getAll = (req, res) => {
  console.log('getAll:', req.params)
  return prisma.material.findMany({
    where: {
      siteId: req.params.siteId
    }
  })
}

const getOne = (req, res) =>
  prisma.material.findFirst({
    where: {
      siteId: req.params.siteId,
      id: parseInt(req.params.id)
    }
  })
const create = (req, res) =>
  prisma.material.create({
    data: { ...req.body, siteId: req.params.siteId }
  })
const update = async (req) => {
  await getOne(req)
  return prisma.material.update({
    where: {
      siteId: req.params.siteId,
      id: parseInt(req.params.materialId)
    }
  })
}

const remove = async (req, res) => {
  await getOne(req)
  return prisma.material.delete({
    where: { siteId: req.params.siteId, id: parse(req.params.id) }
  })
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}
