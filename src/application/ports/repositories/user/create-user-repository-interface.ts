import { CreateUserParams } from '../../../interfaces/user-interface/create-user-service-interface'
import { EnumAccountStatus } from '../models/enum-account-status'
import { CreatedUserModel } from '../models/user-model'

export interface CreateUserRepositoryParams
  extends Omit<CreateUserParams, 'birthDate'> {
  birthDate: Date
  status: EnumAccountStatus
  username: string
}

export interface CreateUserRepositoryInterface {
  createUser: (
    createUserRepositoryParams: CreateUserRepositoryParams,
  ) => Promise<CreatedUserModel | null>
}
