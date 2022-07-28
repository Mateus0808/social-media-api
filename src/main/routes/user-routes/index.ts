import { Router } from 'express'
import { makeUpdateUserInfoControllerFactory } from '../../factories/controllers/user/update-user-info/update-user-info-controller-factory'
import { makeAdminPermissionMiddleware } from '../../factories/middlewares/admin-permission-middleware-factory'
import { AdminPermissionMiddleware } from '../../../presentation/middlewares/admin-permission'
import { expressMiddlewareAdapter } from '../../adapters/express-middleware-adapter'
import { makeUserTimelineControllerFactory } from '../../factories/controllers/user/user-timeline/user-timeline-controller-factory'
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
  router.post(
    '/user/edit-info/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUpdateUserInfoControllerFactory()),
  )
  router.get(
    '/users',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListUsersControllerFactory()),
  )
  router.get(
    '/users/:id',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListOneUserController()),
  )
  router.post(
    '/user/follow/:currentUserId/following/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeFollowUserControllerFactory()),
  )
  router.get(
    '/user/timeline/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUserTimelineControllerFactory()),
  )
}
