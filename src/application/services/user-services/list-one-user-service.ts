import {
  ListOneUserParams,
  ListOneUserResponse,
  ListOneUserServiceInterface,
} from '../../interfaces/user-interface/list-one-user-service-interface'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { userDto } from '../../helpers/user-dto'

export class ListOneUserService implements ListOneUserServiceInterface {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
  ) {}

  public async listOneUser(
    listOneUserParams: ListOneUserParams,
  ): Promise<ListOneUserResponse> {
    const { userId } = listOneUserParams
    const user = await this.loadUserByIdRepository.loadById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }
    return userDto(user)
  }
}
