import { ListUsersService } from '../../../../application/services/user-services/list-users-service'
import { UserRepository } from '../../../../infra/mongodb/repositories/db-user-repository'
import { ListUsersController } from '../../../../presentation/controllers/user/list-users-controller'
import { Controller } from '../../../../presentation/interfaces/controller'

export const makeListUsersControllerFactory = (): Controller => {
  const dbUserRepository = new UserRepository()
  const listUsersService = new ListUsersService(dbUserRepository)
  return new ListUsersController(listUsersService)
}
