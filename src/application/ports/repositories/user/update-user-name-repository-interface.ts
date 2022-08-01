export interface UpdateUserNameRepositoryParams {
  userId: string
  name: string
  lastName: string
}

export interface UpdateUserNameRepositoryResponse {
  id: string
  name: string
  lastName: string
}

export interface UpdateUserNameRepositoryInterface {
  updateUserName(
    updateUserNameRepositoryParams: UpdateUserNameRepositoryParams,
  ): Promise<UpdateUserNameRepositoryResponse | null>
}
