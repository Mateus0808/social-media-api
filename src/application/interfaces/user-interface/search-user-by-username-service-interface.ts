import { ListOneUserResponse } from './list-one-user-service-interface'

export interface SearchUserByUsernameServiceParams {
  username: string
  userId: string
  currentUserId: string
}

export interface SearchUserByUsernameServiceInterface {
  searchUserByUsername: (
    params: SearchUserByUsernameServiceParams,
  ) => Promise<ListOneUserResponse>
}
