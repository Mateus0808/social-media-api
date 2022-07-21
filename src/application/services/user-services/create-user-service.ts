import { UserAlreadyExistsError } from '../../errors/user-alredy-exists-error'
import { UserNotCreatedError } from '../../errors/user-not-created-error'
import { fixName, userCreatedDto } from '../../helpers/user-dto'
import {
  CreateUserParams,
  CreateUserResponse,
  CreateUserServiceInterface,
} from '../../interfaces/create-user-service-interface'
import { Hasher } from '../../ports/hasher/hasher'
import { EnumAccountStatus } from '../../ports/repositories/models/enum-account-status'
import { CreateUserRepositoryInterface } from '../../ports/repositories/user/create-user-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../ports/repositories/user/load-user-by-email-repository-interface'

export class CreateUserService implements CreateUserServiceInterface {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepositoryInterface,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepositoryInterface,
  ) {}

  async createUser(
    createUserParams: CreateUserParams,
  ): Promise<CreateUserResponse> {
    const { email } = createUserParams
    const userAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(
      email,
    )

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError(email)
    }

    const hashedPassword = await this.hasher.hash(createUserParams.password)

    const params = {
      name: fixName(createUserParams.name),
      lastName: fixName(createUserParams.lastName),
      email,
      address: null,
      birthDate: createUserParams.birthDate,
      maritalStatus: createUserParams.maritalStatus,
      phone: createUserParams.phone,
      gender: createUserParams.gender,
      password: hashedPassword,
      status: EnumAccountStatus.Active,
    }

    const userCreated = await this.createUserRepository.createUser(params)

    if (!userCreated) {
      throw new UserNotCreatedError(email)
    }
    return userCreatedDto(userCreated)
  }
}
