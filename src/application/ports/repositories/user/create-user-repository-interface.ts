import { CreateUserParams } from '../../../interfaces/create-user-service-interface'
import { CreatedUserModel } from '../models/user-model'

export type CreateUserRepositoryParams = CreateUserParams

export interface CreateUserRepositoryInterface {
  createUser: (
    createUserRepositoryParams: CreateUserRepositoryParams,
  ) => Promise<CreatedUserModel | null>
}
