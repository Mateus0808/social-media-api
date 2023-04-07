export interface UpdateUserEmailParams {
  userId: string
  email: string
}

export interface UpdateUserEmailResponse {
  id: string
  email: string
}

export interface UpdateUserEmailServiceInterface {
  updateUserEmail: (
    params: UpdateUserEmailParams,
  ) => Promise<UpdateUserEmailResponse>
}
