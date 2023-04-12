import { UserProfileEntity } from './user-profile-entity'

export interface UserEntity {
  name: string
  lastName: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  profile: UserProfileEntity
  phone: string
  gender: 'MALE' | 'FEMALE'
  followers: Array<string>
  followings: Array<string>
  password: string
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  isPrivate: boolean
}
