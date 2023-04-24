import { UserRepository } from './../../../../../infra/mongodb/repositories/db-user-repository'
import { SearchUserByNameService } from '@application/services/user-services/search-user-by-name-service'
import { SearchUserByNameController } from '@presentation/controllers/user/search-user-by-name.controller'
import { makeSearchUserByNameValidator } from './search-user-by-name.validator'

export const makeSearchUserByNameControllerFactory = () => {
  const userRepository = new UserRepository()
  const userService = new SearchUserByNameService(
    userRepository,
    userRepository,
  )

  return new SearchUserByNameController(
    userService,
    makeSearchUserByNameValidator(),
  )
}
