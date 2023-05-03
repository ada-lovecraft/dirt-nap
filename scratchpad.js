import fsx from 'fs-extra'
/** clean up old seeds by dropping original doc and relational ids, extraneous datapoints, transforming snakecase keys to camelcase*/

const siteSeeds = await fsx.readJson('./prisma/seeds/backup/site-seeds.json')
const materialSeeds = await fsx.readJson(
  './prisma/seeds/backup/material-seeds.json'
)

const keysToCamelCase = (obj) => {
  const camelCaseObj = {}
  for (const key in obj) {
    const camelCaseKey = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace('_', '')
    )
    camelCaseObj[camelCaseKey] = obj[key]
  }
  return camelCaseObj
}

const cleanedSiteSeeds = siteSeeds.map((site) => {
  delete site.id
  delete site.deleted
  delete site.createdAt
  delete site.updatedAt
  return keysToCamelCase({ ...site })
})
const cleanedMaterialSeeds = materialSeeds.map((material) => {
  material.cost = material.price
  delete material.id
  delete material.site_id
  delete material.deleted
  delete material.createdAt
  delete material.updatedAt
  delete material.price

  return keysToCamelCase(material)
})

/** save back to original files **/
await fsx.writeJson('./prisma/seeds/site-seeds.json', cleanedSiteSeeds)
await fsx.writeJson('./prisma/seeds/material-seeds.json', cleanedMaterialSeeds)
