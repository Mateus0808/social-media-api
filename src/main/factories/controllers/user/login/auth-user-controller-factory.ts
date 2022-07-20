import { AuthUserService } from '../../../../../application/services/user-services/auth-user-service'
import { BcryptAdapter } from '../../../../../infra/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/jwt/jwt-adapter'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { AuthUserController } from '../../../../../presentation/controllers/user/auth-user-controller'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeAuthUserValidator } from './auth-user-validator-factory'
import { env } from '../../../../config/env'

export const makeAuthUserController = (): Controller => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const payload = env.jwtSecret
  const options = { expiresIn: 86400 }
  const jwtAdapter = new JwtAdapter(payload!, options)
  const dbUserRepository = new UserRepository()
  const authUserService = new AuthUserService(bcryptAdapter, jwtAdapter, dbUserRepository)
  return new AuthUserController(authUserService, makeAuthUserValidator())
}