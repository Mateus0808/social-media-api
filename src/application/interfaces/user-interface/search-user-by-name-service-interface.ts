import { ListUsersServiceResponse } from './list-users-service-interface'

export interface SearchUserByNameServiceParams {
  name: string
  userId: string
  currentUserId: string
  page: string | null
  limit: string | null
}

export interface SearchUserByNameServiceInterface {
  searchUserByName: (
    params: SearchUserByNameServiceParams,
  ) => Promise<ListUsersServiceResponse>
}
