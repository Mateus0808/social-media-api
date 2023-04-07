import { Router } from 'express'
import { makeUpdateCommentControllerFactory } from '../../factories/controllers/comment/update-comment/update-comment-controller-factory'
import { expressMiddlewareAdapter } from '../../adapters/express-middleware-adapter'
import { makeAdminPermissionMiddleware } from '../../factories/middlewares/admin-permission-middleware-factory'
import { makeDeleteCommentControllerFactory } from '../../factories/controllers/comment/delete-comment/delete-comment-controller-factory'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateCommentControllerFactory } from '../../factories/controllers/comment/create-comment/create-comment-controller-factory'
import { makeListCommentsControllerFactory } from '../../factories/controllers/comment/list-comments-controller-factory'

export const commentRouter = (router: Router): void => {
  router.post(
    '/comment/register/:userId/:postId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeCreateCommentControllerFactory()),
  )
  router.get(
    '/comments/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListCommentsControllerFactory()),
  )
  router.delete(
    '/comments/:commentId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeDeleteCommentControllerFactory()),
  )
  router.patch(
    '/comment/update/:commentId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUpdateCommentControllerFactory()),
  )
}
