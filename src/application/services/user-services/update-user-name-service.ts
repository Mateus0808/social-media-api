import {
  UpdateUserNameParams,
  UpdateUserNameResponse,
  UpdateUserNameServiceInterface,
} from '../../interfaces/user-interface/update-user-name-service-interface'
import { UpdateUserNameRepositoryInterface } from '../../ports/repositories/user/update-user-name-repository-interface'
import { ErrorUpdatingUserName } from '../../errors/error-updating-user-name'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'

export class UpdateUserNameService implements UpdateUserNameServiceInterface {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
    private readonly updateUserNameRepository: UpdateUserNameRepositoryInterface,
  ) {}

  async updateUserName(
    params: UpdateUserNameParams,
  ): Promise<UpdateUserNameResponse> {
    const { userId, name, lastName } = params

    const user = await this.loadUserByIdRepository.loadById(userId)
    if (!user) throw new UserNotFoundError()

    const updatedUser = await this.updateUserNameRepository.updateUserName({
      userId,
      name,
      lastName,
    })
    if (!updatedUser) throw new ErrorUpdatingUserName()

    return updatedUser
  }
}
