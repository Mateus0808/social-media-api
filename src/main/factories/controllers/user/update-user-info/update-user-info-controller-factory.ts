import { UpdateUserInfoController } from '../../../../../presentation/controllers/user/update-user-info-controller'
import { makeUpdateUserInfoValidator } from './update-user-info-validator-factory'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { UpdateUserInfoService } from '../../../../../application/services/user-services/update-user-info-service'

export const makeUpdateUserInfoControllerFactory = () => {
  const userRepository = new UserRepository()
  const updateUserInfoService = new UpdateUserInfoService(
    userRepository,
    userRepository,
    userRepository,
  )
  return new UpdateUserInfoController(
    updateUserInfoService,
    makeUpdateUserInfoValidator(),
  )
}
