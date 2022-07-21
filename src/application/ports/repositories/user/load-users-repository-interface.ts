import { UserDbModel } from '../models/user-model'

export interface LoadUsersRepositoryParams {
  page: number | null
  limit: number | null
}

export interface LoadUsersRepositoryResponse {
  users: UserDbModel[]
  pagination: any
}

export interface LoadUsersRepositoryInterface {
  loadUsers: (
    loadUsersRepositoryParams: LoadUsersRepositoryParams,
  ) => Promise<LoadUsersRepositoryResponse | null>
}
