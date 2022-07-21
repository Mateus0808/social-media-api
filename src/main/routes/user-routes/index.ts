import { Router } from 'express'
import { makeFollowUserControllerFactory } from '../../factories/controllers/user/follow-user/follow-user-controller-factory'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateUserController } from '../../factories/controllers/user/create-user-controller-factory'
import { makeListOneUserController } from '../../factories/controllers/user/list-one-user/list-one-user-controller-factory'
import { makeListUsersControllerFactory } from '../../factories/controllers/user/list-users-controller-factory'
import { makeAuthUserController } from '../../factories/controllers/user/login/auth-user-controller-factory'

export const userRouter = (router: Router): void => {
  router.post(
    '/user/authentication',
    expressRouterAdapter(makeAuthUserController()),
  )
  router.post(
    '/users/register',
    expressRouterAdapter(makeCreateUserController()),
  )
  router.get('/users', expressRouterAdapter(makeListUsersControllerFactory()))
  router.get('/users/:id', expressRouterAdapter(makeListOneUserController()))
  router.post(
    '/user/follow/:currentUserId/following/:userId',
    expressRouterAdapter(makeFollowUserControllerFactory()),
  )
}
