import { ImageEntity } from './image-entity'

export interface UserEntity {
  name: string
  lastName: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: 'MALE' | 'FEMALE'
  followers: Array<string>
  followings: Array<string>
  password: string
  profilePhoto: ImageEntity
  coverPhoto: ImageEntity
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  isPrivate: boolean
}
