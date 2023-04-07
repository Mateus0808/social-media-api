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
    params: UpdateUserNameParams,
  ) => Promise<UpdateUserNameResponse>
}
