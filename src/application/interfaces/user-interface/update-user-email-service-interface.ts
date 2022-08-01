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
    updateUserEmailParams: UpdateUserEmailParams,
  ) => Promise<UpdateUserEmailResponse>
}
