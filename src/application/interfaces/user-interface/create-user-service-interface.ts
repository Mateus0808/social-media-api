import { UserEntity } from '../../../domain/entities/user-entity'

export interface CreateUserParams {
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
  id: string
  followers: Array<string>
  followings: Array<string>
  createdAt: Date
}

export interface CreateUserServiceInterface {
  createUser: (
    createUserParams: CreateUserParams,
  ) => Promise<CreateUserResponse>
}
