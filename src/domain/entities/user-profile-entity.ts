import { UserDbModel } from '@application/ports/repositories/models/user-model'

export interface UserProfileEntity {
  user: UserDbModel
  profilePhoto: string
  coverPhoto: string
}
