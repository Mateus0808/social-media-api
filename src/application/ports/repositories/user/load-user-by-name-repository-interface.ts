import { UserDbModel } from '../models/user-model'

export interface SearchUserByNameRepositoryParams {
  name: string
  page: number | null
  limit: number | null
}

export interface SearchUserByNameRepositoryResponse {
  users: UserDbModel[]
  pagination: any
}

export interface LoadUserByNameRepositoryInterface {
  loadUserByName: (
    name: SearchUserByNameRepositoryParams,
  ) => Promise<SearchUserByNameRepositoryResponse | null>
}
