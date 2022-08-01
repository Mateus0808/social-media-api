export interface UpdateUserNameParams {
  userId: string
  name: string
  lastName: string
}

export interface UpdateUserNameResponse {
  id: string
  name: string
  lastName: string
}

export interface UpdateUserNameServiceInterface {
  updateUserName: (
    updateUserNameParams: UpdateUserNameParams,
  ) => Promise<UpdateUserNameResponse>
}
