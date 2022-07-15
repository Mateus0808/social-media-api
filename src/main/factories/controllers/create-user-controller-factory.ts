import { CreateUserService } from '../../../application/services/user-services/create-user-service'
import { BcryptAdapter } from '../../../infra/bcrypt/bcrypt-adapter'
import { UserRepository } from '../../../infra/mongodb/repositories/db-user-repository'
import { CreateUserController } from '../../../presentation/controllers/user/create-user-controller'
import { Controller } from '../../../presentation/interfaces/controller'

export const makeCreateUserController = (): Controller => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbUserRepository = new UserRepository()
  const createUserService = new CreateUserService(bcryptAdapter, dbUserRepository, dbUserRepository)
  return new CreateUserController(createUserService)
}
