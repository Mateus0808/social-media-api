import { UserNotFoundByPropertyError } from './../../errors/user-not-found-by-property-error'
import { UserNotAuthorizedError } from './../../errors/user-not-authorized-error'
import { LoadUserByUsernameRepositoryInterface } from './../../ports/repositories/user/load-user-by-username-repository-interface'
import {
  SearchUserByUsernameServiceInterface,
  SearchUserByUsernameServiceParams,
} from './../../interfaces/user-interface/search-user-by-username-service-interface'
import { userDto } from './../../helpers/user-dto'
import { LoadUserByIdRepositoryInterface } from './../../ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '@application/errors/user-not-found-error'
import { GetUserByIdResponse } from '@application/interfaces/user-interface/get-user-by-id-service.interface'

export class SearchUserByUsernameService
  implements SearchUserByUsernameServiceInterface
{
  private readonly loadUserByUsernameRepository: LoadUserByUsernameRepositoryInterface

  private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface

  constructor(
    loadUserByUsernameRep: LoadUserByUsernameRepositoryInterface,
    loadUserByIdRep: LoadUserByIdRepositoryInterface,
  ) {
    this.loadUserByUsernameRepository = loadUserByUsernameRep
    this.loadUserByIdRepository = loadUserByIdRep
  }

  async searchUserByUsername(
    params: SearchUserByUsernameServiceParams,
  ): Promise<GetUserByIdResponse> {
    const { username, userId, currentUserId } = params

    const currentUser = await this.loadUserByIdRepository.loadById(userId)
    if (!currentUser) throw new UserNotFoundError()

    if (userId !== currentUserId) throw new UserNotAuthorizedError()

    const user = await this.loadUserByUsernameRepository.loadUserByUsername(
      username,
    )
    if (!user) throw new UserNotFoundByPropertyError(username)

    return userDto(user)
  }
}
