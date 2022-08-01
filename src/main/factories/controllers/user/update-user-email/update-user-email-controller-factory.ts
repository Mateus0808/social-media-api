import { UpdateUserEmailService } from '../../../../../application/services/user-services/update-user-email-service'
import { UpdateUserEmailController } from '../../../../../presentation/controllers/user/update-user-email-controller'
import { makeUpdateUserEmailValidator } from './update-user-email-validator-factory'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'

export const makeUpdateUserEmailControllerFactory = () => {
  const userRepository = new UserRepository()
  const updateUserEmailService = new UpdateUserEmailService(
    userRepository,
    userRepository,
    userRepository,
  )
  return new UpdateUserEmailController(
    updateUserEmailService,
    makeUpdateUserEmailValidator(),
  )
}
