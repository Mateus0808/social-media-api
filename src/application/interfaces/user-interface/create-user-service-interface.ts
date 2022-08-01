import { UserEntity } from '../../../domain/entities/user-entity'

export interface CreateUserParams {
  name: string
  lastName: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  password: string
  gender: 'MALE' | 'FEMALE'
  phone: string
}

export interface CreateUserResponse
  extends Omit<UserEntity, 'password' | 'address' | 'isAdmin'> {
  id: string
  createdAt: Date
}

export interface CreateUserServiceInterface {
  createUser: (
    createUserParams: CreateUserParams,
  ) => Promise<CreateUserResponse>
}
