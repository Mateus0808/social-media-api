import { UpdateUserNameController } from '../../../../../presentation/controllers/user/update-user-name-controller'
import { makeUpdateUserNameValidator } from './update-user-name-validator-factory'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { UpdateUserNameService } from '../../../../../application/services/user-services/update-user-name-service'

export const makeUpdateUserNameControllerFactory = () => {
  const userRepository = new UserRepository()
  const updateUserNameService = new UpdateUserNameService(
    userRepository,
    userRepository,
  )
  return new UpdateUserNameController(
    updateUserNameService,
    makeUpdateUserNameValidator(),
  )
}
