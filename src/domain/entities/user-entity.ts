import { AddressEntity } from './address-entity'

export interface UserEntity {
  name: string
  lastName: string
  address: AddressEntity
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: 'MALE' |'FEMALE'
  isAdmin: boolean
  password: string
  status: 'Active' | 'Closed' | 'Canceled' | 'Disabled'
}
