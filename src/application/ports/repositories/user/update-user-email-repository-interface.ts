export interface UpdateUserEmailRepositoryParams {
  userId: string
  email: string
}

export interface UpdateUserEmailRepositoryResponse {
  id: string
  email: string
}

export interface UpdateUserEmailRepositoryInterface {
  updateUserEmail: (
    updateUserEmailRepositoryParams: UpdateUserEmailRepositoryParams,
  ) => Promise<UpdateUserEmailRepositoryResponse | null>
}
