import { Router } from 'express'
import { makeAdminPermissionMiddleware } from '../../factories/middlewares/admin-permission-middleware-factory'
import { expressMiddlewareAdapter } from '../../adapters/express-middleware-adapter'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreatePostControllerFactory } from '../../factories/controllers/post/create-post/create-post-controller-factory'
import { makeListPostsControllerFactory } from '../../factories/controllers/post/list-post-controller-factory'
import { makeDeletePostControllerFactory } from '../../factories/controllers/post/delete-post/delete-post-controller-factory'

export const postRoutes = (router: Router): void => {
  router.post(
    '/post/register/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeCreatePostControllerFactory()),
  )
  router.get(
    '/posts',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListPostsControllerFactory()),
  )
  router.delete(
    '/post/:postId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeDeletePostControllerFactory()),
  )
}
