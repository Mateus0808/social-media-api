import { AddressEntity } from './address-entity'

export interface UserEntity {
  name: string
  lastName: string
  username: string
  address: AddressEntity
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: 'MALE' | 'FEMALE'
  followers: Array<string>
  followings: Array<string>
  isAdmin: boolean
  password: string
  status: 'Active' | 'Closed' | 'Canceled' | 'Disabled'
}
