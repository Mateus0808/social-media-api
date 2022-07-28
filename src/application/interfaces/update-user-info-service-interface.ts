export interface UpdateUserInfoParams {
  userId: string
  section: string
  name: string
  lastName: string
  username: string
  email: string
}

export interface UpdateUserInfoResponse {
  name?: string
  lastName?: string
  username?: string
  email?: string
}

export interface UpdateUserInfoServiceInterface {
  updateUserInfo(
    updateUserInfoParams: UpdateUserInfoParams,
  ): Promise<UpdateUserInfoResponse>
}
