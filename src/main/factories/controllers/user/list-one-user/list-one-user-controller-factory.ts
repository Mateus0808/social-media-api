import { ListOneUserService } from '../../../../../application/services/user-services/list-one-user-service'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { ListOneUserController } from '../../../../../presentation/controllers/user/list-one-user-controller'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeListOneUserValidator } from './list-one-user-validator-factory'

export const makeListOneUserController = (): Controller => {
  const dbUserRepository = new UserRepository()
  const listOneUserService = new ListOneUserService(dbUserRepository)
  return new ListOneUserController(
    listOneUserService,
    makeListOneUserValidator(),
  )
}
