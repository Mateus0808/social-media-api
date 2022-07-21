import { FollowUserService } from '../../../../../application/services/user-services/follow-user-service'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { FollowUserController } from '../../../../../presentation/controllers/user/follow-user-controller'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { makeFollowUserValidator } from './follow-user-validator-factory'

export const makeFollowUserControllerFactory = (): Controller => {
  const userRepository = new UserRepository()
  const followUserService = new FollowUserService(
    userRepository,
    userRepository,
  )

  return new FollowUserController(followUserService, makeFollowUserValidator())
}
