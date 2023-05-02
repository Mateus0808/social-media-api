import { GetUserByIdService } from '@application/services/user-services/get-user-by-id.service'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { GetUserByIdController } from '@presentation/controllers/user/get-user-by-id.controller'
import { makeGetUserByIdValidator } from './get-user-by-id-validator-factory'

export const makeGetUserByIdControllerFactory = (): Controller => {
  const dbUserRepository = new UserRepository()
  const listOneUserService = new GetUserByIdService(dbUserRepository)
  return new GetUserByIdController(
    listOneUserService,
    makeGetUserByIdValidator(),
  )
}
