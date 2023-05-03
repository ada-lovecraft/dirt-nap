import { PrismaClient } from '@prisma/client'
import fsx from 'fs-extra'

const prisma = new PrismaClient()

const rand = (max, min = 0) => ~~(Math.random() * (max - min) + min)
const repeat = (fn, n) => Array(n).fill().map(fn)

const seed = async () => {
  const siteSeeds = await fsx.readJson('./prisma/seeds/site-seeds.json')
  const materialSeeds = await fsx.readJson('./prisma/seeds/material-seeds.json')
  let mcursor = 0
  for (const site of siteSeeds) {
    site.materials = {
      create: repeat(() => {
        mcursor = ++mcursor % materialSeeds.length
        const material = materialSeeds[mcursor]
        return { ...material, deliveryDate: new Date(material.deliveryDate) }
      }, rand(5, 2))
    }
    await prisma.site.create({ data: site })
  }
}
try {
  await seed()
  await prisma.$disconnect()
} catch (err) {
  console.error(err)
  await prisma.$disconnect()
  process.exit(1)
}
