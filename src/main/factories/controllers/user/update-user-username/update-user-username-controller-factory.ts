import { UpdateUserUsernameService } from '../../../../../application/services/user-services/update-user-username-service'
import { UpdateUserUsernameController } from '../../../../../presentation/controllers/user/update-user-username-controller'
import { makeUpdateUserUsernameValidator } from './update-user-username-validator-factory'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'

export const makeUpdateUserUsernameControllerFactory = () => {
  const userRepository = new UserRepository()
  const updateUserUsernameService = new UpdateUserUsernameService(
    userRepository,
    userRepository,
  )
  return new UpdateUserUsernameController(
    updateUserUsernameService,
    makeUpdateUserUsernameValidator(),
  )
}
