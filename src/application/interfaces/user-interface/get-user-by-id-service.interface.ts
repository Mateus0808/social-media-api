import { UserEntity } from '../../../domain/entities/user-entity'

export interface GetUserByIdParams {
  userId: string
}

export interface GetUserByIdResponse extends Omit<UserEntity, 'password'> {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface GetUserByIdServiceInterface {
  getUserById: (params: GetUserByIdParams) => Promise<GetUserByIdResponse>
}
