import { Router } from 'express'
import { expressRouterAdapter } from '../../adapters/express-route-adapter'
import { makeCreateUserController } from '../../factories/controllers/create-user-controller-factory'

export const userRouter = (router: Router): void => {
  router.post('/users/register', expressRouterAdapter(makeCreateUserController()))
}
