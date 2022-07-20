export interface ListUsersServiceParams {
  page: string | null
  limit: string | null
}

export interface ListUsersServiceResponse {
  users: UsersServiceResponse[]
  pagination: any
}

interface UsersServiceResponse {
  id: string
  name: string
  lastName: string
  email: string
  registrationDate: Date
  status: string
}

export interface ListUsersServiceInterface {
  listUsers: (
    listUsersServiceParams: ListUsersServiceParams
  ) => Promise<ListUsersServiceResponse>
}
