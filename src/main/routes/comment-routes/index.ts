import { Router } from 'express'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateCommentControllerFactory } from '../../factories/controllers/comment/create-comment/create-comment-controller-factory'
import { makeListCommentsControllerFactory } from '../../factories/controllers/comment/list-comments-controller-factory'

export const commentRouter = (router: Router): void => {
  router.post('/comment/register/:userId/:postId', expressRouterAdapter(makeCreateCommentControllerFactory()))
  router.get('/comments', expressRouterAdapter(makeListCommentsControllerFactory()))
}
