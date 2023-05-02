import {
  GetUserByIdParams,
  GetUserByIdResponse,
  GetUserByIdServiceInterface,
} from './../../interfaces/user-interface/get-user-by-id-service.interface'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { userDto } from '../../helpers/user-dto'

export class GetUserByIdService implements GetUserByIdServiceInterface {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
  ) {}

  public async getUserById(
    params: GetUserByIdParams,
  ): Promise<GetUserByIdResponse> {
    const { userId } = params
    const user = await this.loadUserByIdRepository.loadById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }
    return userDto(user)
  }
}
