import test from 'ava'
import app from '../src/app.js'
import listEndpoints from 'express-list-endpoints'
test('all site routes properly defined', (t) => {
  const routes = [
    ['/sites', ['GET', 'POST']],
    ['/sites/:id', ['GET', 'PUT', 'DELETE']]
  ]

  const endpoints = listEndpoints(app).filter(
    (e) => !e.path.includes('/materials')
  )
  t.log('site endpoints', endpoints)
  const actual = endpoints.map((e) => [e.path, e.methods])
  t.deepEqual(actual, routes, 'site routes are incorrect')
})
test('all material routes properly defined', (t) => {
  const routes = [
    ['/sites/:siteId/materials', ['GET', 'POST']],
    ['/sites/:siteId/materials/:id', ['GET', 'PUT', 'DELETE']]
  ]
  const actual = listEndpoints(app)
    .filter((e) => e.path.includes('/materials'))
    .map((e) => [e.path, e.methods])
  t.deepEqual(actual, routes, 'all material routes properly defined')
})
