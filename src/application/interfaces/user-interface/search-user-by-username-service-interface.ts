import { GetUserByIdResponse } from './get-user-by-id-service.interface'

export interface SearchUserByUsernameServiceParams {
  username: string
  userId: string
  currentUserId: string
}

export interface SearchUserByUsernameServiceInterface {
  searchUserByUsername: (
    params: SearchUserByUsernameServiceParams,
  ) => Promise<GetUserByIdResponse>
}
