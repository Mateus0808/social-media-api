import { ErrorUpdatingUserUsername } from '../../errors/error-updating-user-username'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { UpdateUserUsernameRepositoryInterface } from '../../ports/repositories/user/update-user-username-repository-interface'
import {
  UpdateUserUsernameParams,
  UpdateUserUsernameResponse,
  UpdateUserUsernameServiceInterface,
} from '../../interfaces/user-interface/update-user-username-service-interface'

export class UpdateUserUsernameService
  implements UpdateUserUsernameServiceInterface
{
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
    private readonly updateUserUsernameRepository: UpdateUserUsernameRepositoryInterface,
  ) {}

  async updateUserUsername(
    updateUserUsernameParams: UpdateUserUsernameParams,
  ): Promise<UpdateUserUsernameResponse> {
    const { userId, username } = updateUserUsernameParams

    const user = await this.loadUserByIdRepository.loadById(userId)
    if (!user) throw new UserNotFoundError()

    const updatedUser =
      await this.updateUserUsernameRepository.updateUserUsername({
        userId,
        username,
      })
    if (!updatedUser) throw new ErrorUpdatingUserUsername()

    return updatedUser
  }
}
