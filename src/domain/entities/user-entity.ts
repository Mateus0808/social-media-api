import { AddressEntity } from './address-entity'

export interface UserEntity {
  name: string
  lastName: string
  address: AddressEntity
  email: string
  phone: string
  gender: 'MALE' |'FEMALE'
  password: string
  status: 'Active' | 'Closed' | 'Canceled' | 'Disabled'
}
