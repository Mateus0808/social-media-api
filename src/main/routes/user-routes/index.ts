import { Router } from 'express'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateUserController } from '../../factories/controllers/user/create-user-controller-factory'
import { makeListOneUserController } from '../../factories/controllers/user/list-one-user/list-one-user-controller-factory'
import { makeListUsersControllerFactory } from '../../factories/controllers/user/list-users-controller-factory'
import { makeAuthUserController } from '../../factories/controllers/user/login/auth-user-controller-factory'

export const userRouter = (router: Router): void => {
  router.post('/authentication/auth', expressRouterAdapter(makeAuthUserController()))
  router.post('/users/register', expressRouterAdapter(makeCreateUserController()))
  router.get('/users', expressRouterAdapter(makeListUsersControllerFactory()))
  router.get('/users/:id', expressRouterAdapter(makeListOneUserController()))
}
