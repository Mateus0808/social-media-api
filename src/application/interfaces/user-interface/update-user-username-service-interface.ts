export interface UpdateUserUsernameParams {
  userId: string
  username: string
}

export interface UpdateUserUsernameResponse {
  id: string
  username: string
}

export interface UpdateUserUsernameServiceInterface {
  updateUserUsername: (
    updateUserUsernameParams: UpdateUserUsernameParams,
  ) => Promise<UpdateUserUsernameResponse>
}
