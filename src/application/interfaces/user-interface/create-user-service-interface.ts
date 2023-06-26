export interface CreateUserParams {
  username: string
  name: string
  lastName: string
  email: string
  birthDate: string
  maritalStatus: string
  password: string
  gender: 'MALE' | 'FEMALE'
  phone: string
}

export interface CreateUserResponse {
  username: string
  name: string
  lastName: string
  email: string
  birthDate: Date
  maritalStatus: string
  gender: 'MALE' | 'FEMALE'
  phone: string
  password: string
  isPrivate: boolean
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  id: string
  followers: Array<string>
  followings: Array<string>
  profilePhoto: any
  coverPhoto: any
  createdAt: Date
}

export interface CreateUserServiceInterface {
  createUser: (
    createUserParams: CreateUserParams,
  ) => Promise<CreateUserResponse>
}
