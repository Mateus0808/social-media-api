import { userToRepository } from './../../helpers/user-to-repository'
import { LoadUserByNameRepositoryInterface } from '@application/ports/repositories/user/load-user-by-name-repository-interface'
import {
  SearchUserByNameServiceInterface,
  SearchUserByNameServiceParams,
} from './../../interfaces/user-interface/search-user-by-name-service-interface'
import { UserNotFoundByPropertyError } from './../../errors/user-not-found-by-property-error'
import { UserNotAuthorizedError } from './../../errors/user-not-authorized-error'
import { userToPaginationDto } from './../../helpers/user-dto'
import { LoadUserByIdRepositoryInterface } from './../../ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '@application/errors/user-not-found-error'
import { ListUsersServiceResponse } from '@application/interfaces/user-interface/list-users-service-interface'

export class SearchUserByNameService
  implements SearchUserByNameServiceInterface
{
  loadUserByNameRepository: LoadUserByNameRepositoryInterface

  loadUserByIdRepository: LoadUserByIdRepositoryInterface

  constructor(
    private readonly loadUserByNameRep: LoadUserByNameRepositoryInterface,
    private readonly loadUserByIdRep: LoadUserByIdRepositoryInterface,
  ) {
    this.loadUserByNameRepository = loadUserByNameRep
    this.loadUserByIdRepository = loadUserByIdRep
  }

  async searchUserByName(
    params: SearchUserByNameServiceParams,
  ): Promise<ListUsersServiceResponse> {
    const { name, userId, currentUserId, ...pageLimit } = params
    const { limit, page } = userToRepository(pageLimit)

    const currentUser = await this.loadUserByIdRepository.loadById(userId)
    if (!currentUser) throw new UserNotFoundError()

    if (userId !== currentUserId) throw new UserNotAuthorizedError()

    const user = await this.loadUserByNameRepository.loadUserByName({
      name,
      limit,
      page,
    })
    if (!user) throw new UserNotFoundByPropertyError(name)

    return userToPaginationDto(user)
  }
}
