import { userEmailDto } from '../../helpers/user-dto'
import { ErrorUpdatingUserEmail } from '../../errors/updating-user-email-error'
import { UpdateUserEmailRepositoryInterface } from '../../ports/repositories/user/update-user-email-repository-interface'
import { UsersNotFoundError } from '../../errors/user-not-found-error'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../ports/repositories/user/load-user-by-email-repository-interface'
import {
  UpdateUserInfoParams,
  UpdateUserInfoResponse,
  UpdateUserInfoServiceInterface,
} from '../../interfaces/update-user-info-service-interface'

export class UpdateUserInfoService implements UpdateUserInfoServiceInterface {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepositoryInterface,
    private readonly updateUserEmailRepository: UpdateUserEmailRepositoryInterface,
  ) {}

  async updateUserInfo(
    updateUserInfoParams: UpdateUserInfoParams,
  ): Promise<UpdateUserInfoResponse> {
    let userResponse: UpdateUserInfoResponse = {}
    const { section, userId } = updateUserInfoParams

    const user = await this.loadUserByIdRepository.loadById(userId)
    if (!user) throw new UsersNotFoundError()

    if (section === 'email') {
      const { email } = updateUserInfoParams

      const userAlreadyExists =
        await this.loadUserByEmailRepository.loadByEmail(email)
      if (userAlreadyExists) throw new UserAlreadyExistsError(email)

      const updatedUser = await this.updateUserEmailRepository.updateUserEmail({
        userId,
        email,
      })
      if (!updatedUser) throw new ErrorUpdatingUserEmail()

      userResponse = userEmailDto(updatedUser)
    }

    return userResponse
  }
}
