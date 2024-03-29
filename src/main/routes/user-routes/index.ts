import { Router } from 'express'
import { makeUpdateUserNameControllerFactory } from '../../factories/controllers/user/update-user-name/update-user-name-controller-factory'
import { makeUpdateUserUsernameControllerFactory } from '../../factories/controllers/user/update-user-username/update-user-username-controller-factory'
import { makeUpdateUserEmailControllerFactory } from '../../factories/controllers/user/update-user-email/update-user-email-controller-factory'
import { makeAdminPermissionMiddleware } from '../../factories/middlewares/admin-permission-middleware-factory'
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
  router.get(
    '/users',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListUsersControllerFactory()),
  )
  router.get(
    '/users/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeListOneUserController()),
  )
  router.put(
    '/user/follow/:currentUserId/following/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeFollowUserControllerFactory()),
  )
  router.get(
    '/user/timeline/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUserTimelineControllerFactory()),
  )
  router.patch(
    '/user/edit-email/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUpdateUserEmailControllerFactory()),
  )
  router.patch(
    '/user/edit-username/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUpdateUserUsernameControllerFactory()),
  )
  router.put(
    '/user/edit-name/:userId',
    expressMiddlewareAdapter(makeAdminPermissionMiddleware()),
    expressRouterAdapter(makeUpdateUserNameControllerFactory()),
  )
}
