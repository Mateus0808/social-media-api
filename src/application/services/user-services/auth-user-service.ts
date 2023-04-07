import { userCreatedDto } from '../../helpers/user-dto'
import { IncorrectPasswordError } from '../../errors/incorrect-password-error'
import { UserNotExistsError } from '../../errors/user-not-exists-error'
import {
  AuthUserServiceInterface,
  AuthUserParams,
  AuthUserResponse,
} from '../../interfaces/user-interface/auth-user-service-interface'
import { HashComparer } from '../../ports/hasher/hasher'
import { Encrypter } from '../../ports/encrypter/encrypter'
import { LoadUserByEmailRepositoryInterface } from '../../ports/repositories/user/load-user-by-email-repository-interface'

export class AuthUserService implements AuthUserServiceInterface {
  constructor(
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepositoryInterface,
  ) {}

  async auth(authUserParams: AuthUserParams): Promise<AuthUserResponse> {
    const { email, password } = authUserParams

    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (!user) throw new UserNotExistsError(email)

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.password,
    )
    if (!passwordMatch) {
      throw new IncorrectPasswordError()
    }

    const token = await this.encrypter.encrypt({ id: user.id })

    const response: AuthUserResponse = {
      user: userCreatedDto(user),
      token,
    }

    return response
  }
}
