import { UserProfileEntity } from './../../../../domain/entities/user-profile-entity'

export interface UserProfileDBModel extends UserProfileEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
