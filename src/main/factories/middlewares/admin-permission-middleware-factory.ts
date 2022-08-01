import { AdminPermissionMiddleware } from '../../../presentation/middlewares/admin-permission'
import { Middleware } from '../../../presentation/interfaces/middleware'
import { JwtAdapter } from '../../../infra/jwt/jwt-adapter'
import { UserRepository } from '../../../infra/mongodb/repositories/db-user-repository'
import { env } from '../../config/env'

export const makeAdminPermissionMiddleware = (): Middleware => {
  const secret = env.jwtSecret || ''
  const jwtAdapter = new JwtAdapter(secret)
  const userRepository = new UserRepository()
  return new AdminPermissionMiddleware(jwtAdapter, userRepository)
}
