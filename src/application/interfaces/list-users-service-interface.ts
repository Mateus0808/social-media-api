export interface ListUsersServiceParams {
  page: string | null
  limit: string | null
}

interface UsersServiceResponse {
  id: string
  name: string
  lastName: string
  email: string
  registrationDate: Date
  status: string
}

export interface ListUsersServiceResponse {
  users: UsersServiceResponse[]
  pagination: any
}

export interface ListUsersServiceInterface {
  listUsers: (
    listUsersServiceParams: ListUsersServiceParams,
  ) => Promise<ListUsersServiceResponse>
}
