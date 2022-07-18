export interface CreateUserParams {
  name: string
  lastName: string
  email: string
  birthDate: Date
  maritalStatus: string
  password: string
  gender: 'MALE' |'FEMALE'
  phone: string
}

export interface CreateUserResponse {
  id: string
  name: string
  lastName: string
  email: string
  birthDate: Date
  maritalStatus: string
  gender: 'MALE' |'FEMALE'
  phone: string
  status: 'Active' | 'Closed' | 'Canceled' | 'Disabled'
}

export interface CreateUserServiceInterface {
  createUser: (createUserParams: CreateUserParams) => Promise<CreateUserResponse>
}
