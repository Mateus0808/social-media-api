export interface UpdateUserUsernameRepositoryParams {
  userId: string
  username: string
}

export interface UpdateUserUsernameRepositoryResponse {
  id: string
  username: string
}

export interface UpdateUserUsernameRepositoryInterface {
  updateUserUsername(
    updateUserUsernameRepositoryParams: UpdateUserUsernameRepositoryParams,
  ): Promise<UpdateUserUsernameRepositoryResponse | null>
}
