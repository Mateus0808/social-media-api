import { LoadUserByUsernameRepositoryInterface } from './../../ports/repositories/user/load-user-by-username-repository-interface'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { UserNotCreatedError } from '../../errors/user-not-created-error'
import { fixName, userCreatedDto } from '../../helpers/user-dto'
import {
  CreateUserParams,
  CreateUserResponse,
  CreateUserServiceInterface,
} from '../../interfaces/user-interface/create-user-service-interface'
import { Hasher } from '../../ports/hasher/hasher'
import { CreateUserRepositoryInterface } from '../../ports/repositories/user/create-user-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../ports/repositories/user/load-user-by-email-repository-interface'

export class CreateUserService implements CreateUserServiceInterface {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepositoryInterface,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepositoryInterface,
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepositoryInterface,
  ) {}

  async createUser(
    createUserParams: CreateUserParams,
  ): Promise<CreateUserResponse> {
    const { email, username } = createUserParams

    const userAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(
      email,
    )
    console.log('userAlreadyExists 2222', userAlreadyExists)
    if (userAlreadyExists) throw new UserAlreadyExistsError(email)

    const usernameAlreadyExists =
      await this.loadUserByUsernameRepository.loadUserByUsername(username)
    if (usernameAlreadyExists) throw new UserAlreadyExistsError(username)

    const hashedPassword = await this.hasher.hash(createUserParams.password)

    const params = {
      name: fixName(createUserParams.name),
      lastName: fixName(createUserParams.lastName),
      username,
      email,
      birthDate: new Date(createUserParams.birthDate),
      maritalStatus: createUserParams.maritalStatus,
      phone: createUserParams.phone,
      gender: createUserParams.gender,
      password: hashedPassword,
    }

    const userCreated = await this.createUserRepository.createUser(params)

    if (!userCreated) {
      throw new UserNotCreatedError(email)
    }
    return userCreatedDto(userCreated)
  }
}
