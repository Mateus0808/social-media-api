import {
  CreatedUserModel,
  UserDbModel,
} from '../../../../src/application/ports/repositories/models/user-model'
import { UserEntity } from '../../../../src/domain/entities/user-entity'

export const fakeUser = (): UserEntity => ({
  username: 'username01',
  name: 'name',
  lastName: 'lastName',
  email: 'any_email@email.com',
  phone: '(88) 99865-4949',
  status: 'Active',
  gender: 'MALE',
  birthDate: new Date('08/08/1991'),
  address: {
    city: 'Seattle',
    country: 'United States',
    state: 'United States',
    street: 'Seattle',
    zipCode: '648600-000',
  },
  maritalStatus: 'Solteiro',
  followers: [],
  followings: [],
  password: 'hashed_password',
})

export const fakeCreateUserDbModel = (): CreatedUserModel => ({
  username: 'username01',
  name: 'name',
  lastName: 'lastName',
  email: 'any_email@email.com',
  phone: '(88) 99865-4949',
  status: 'Active',
  gender: 'MALE',
  birthDate: new Date('08/08/1991'),
  maritalStatus: 'Solteiro',
  followers: [],
  followings: [],
  id: '1',
  createdAt: new Date('2000-04-09'),
  updatedAt: new Date('2000-04-09'),
})

export const fakeUserDbModel = (): UserDbModel => ({
  username: 'username01',
  name: 'name',
  lastName: 'lastName',
  email: 'any_email@email.com',
  phone: '(88) 99865-4949',
  status: 'Active',
  gender: 'MALE',
  address: {
    city: 'Seattle',
    country: 'United States',
    state: 'United States',
    street: 'Seattle',
    zipCode: '648600-000',
  },
  birthDate: new Date('08/08/1991'),
  maritalStatus: 'Solteiro',
  followers: [],
  followings: [],
  password: 'hashed_password',
  id: '1',
  createdAt: new Date('2000-04-09'),
  updatedAt: new Date('2000-04-09'),
})
