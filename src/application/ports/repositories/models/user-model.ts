import { UserEntity } from '../../../../domain/entities/user-entity'

export interface CreatedUserModel
  extends Omit<UserEntity, 'address' | 'password'> {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface UserDbModel extends UserEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
