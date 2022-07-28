export interface ListUsersServiceParams {
  page: string | null
  limit: string | null
}

interface UserServiceResponse {
  id: string
  name: string
  lastName: string
  email: string
  registrationDate: Date
  status: string
}

export interface ListUsersServiceResponse {
  users: UserServiceResponse[]
  pagination: any
}

export interface ListUsersServiceInterface {
  listUsers: (
    listUsersServiceParams: ListUsersServiceParams,
  ) => Promise<ListUsersServiceResponse>
}
