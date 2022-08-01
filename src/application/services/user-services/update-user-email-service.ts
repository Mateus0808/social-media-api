import { UpdateUserEmailRepositoryInterface } from '../../ports/repositories/user/update-user-email-repository-interface'
import { userEmailDto } from '../../helpers/user-dto'
import { ErrorUpdatingUserEmail } from '../../errors/updating-user-email-error'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByEmailRepositoryInterface } from '../../ports/repositories/user/load-user-by-email-repository-interface'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import {
  UpdateUserEmailParams,
  UpdateUserEmailResponse,
  UpdateUserEmailServiceInterface,
} from '../../interfaces/user-interface/update-user-email-service-interface'

export class UpdateUserEmailService implements UpdateUserEmailServiceInterface {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepositoryInterface,
    private readonly updateUserEmailRepository: UpdateUserEmailRepositoryInterface,
  ) {}

  async updateUserEmail(
    updateUserEmailParams: UpdateUserEmailParams,
  ): Promise<UpdateUserEmailResponse> {
    const { email, userId } = updateUserEmailParams

    const user = await this.loadUserByIdRepository.loadById(userId)
    if (!user) throw new UserNotFoundError()

    const emailAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(
      email,
    )
    if (emailAlreadyExists) throw new UserAlreadyExistsError(email)

    const updatedUser = await this.updateUserEmailRepository.updateUserEmail({
      userId,
      email,
    })
    if (!updatedUser) throw new ErrorUpdatingUserEmail()

    return userEmailDto(updatedUser)
  }
}
