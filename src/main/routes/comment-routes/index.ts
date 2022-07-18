import { Router } from 'express'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateCommentControllerFactory } from '../../factories/controllers/comment/create-comment-controller-factory'

export const commentRouter = (router: Router): void => {
  router.post('/comment/register/:userId/:postId', expressRouterAdapter(makeCreateCommentControllerFactory()))
  // router.get('/comments', expressRouterAdapter(makemakeListUsersControllerFactory()))
  // router.get('/comments/:id', expressRouterAdapter(makeListOneUserController()))
}
