import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { MerrorMiddleware } from 'express-merror'
import siteController from './controllers/sites.js'
import materialController from './controllers/materials.js'
import crudRouter from './lib/crud-router.js'

const app = express()

app
  .use(morgan('dev'))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

const createRoutes = crudRouter(app)
createRoutes('/sites', siteController)
createRoutes('/sites/:siteId/materials', materialController)

app
  .use((req, res, next) => {
    res.status(404).json({ error: `${req.path} not found` })
  })
  .use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: err.message })
  })

export default app
