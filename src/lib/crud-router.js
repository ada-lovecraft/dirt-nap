import { Router } from 'express'

const routeHandler = (fn) => async (req, res, next) => {
  try {
    const results = await fn(req)
    res.json(results)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      console.log(err.name)
      res.status(404).json({ error: err.message })
    } else {
      next(err)
    }
  }
}
export default (router) => (path, controller) => {
  console.log('path:', path)
  router
    .get(path, routeHandler(controller.getAll))
    .post(path, routeHandler(controller.create))
  router
    .get(`${path}/:id`, routeHandler(controller.getOne))
    .put(`${path}/:id`, routeHandler(controller.update))
    .delete(`${path}/:id`, routeHandler(controller.remove))

  return router
}
