import { CreateUserParams } from '../../../interfaces/user-interface/create-user-service-interface'
import { CreatedUserModel } from '../models/user-model'

export interface CreateUserRepositoryParams
  extends Omit<CreateUserParams, 'birthDate'> {
  birthDate: Date
}

export interface CreateUserRepositoryInterface {
  createUser: (
    createUserRepositoryParams: CreateUserRepositoryParams,
  ) => Promise<CreatedUserModel | null>
}
