import { UserRepository } from 'infra/mongodb/repositories/db-user-repository'
import { SearchUserByUsernameService } from '@application/services/user-services/search-user-by-username-service'
import { SearchUserByUsernameController } from '@presentation/controllers/user/search-user-by-username-controller'
import { makeSearchUserByUsernameValidator } from './search-user-by-username-validator'

export const makeSearchUserByUsernameControllerFactory = () => {
  const userRepository = new UserRepository()
  const userService = new SearchUserByUsernameService(
    userRepository,
    userRepository,
  )
  return new SearchUserByUsernameController(
    userService,
    makeSearchUserByUsernameValidator(),
  )
}
