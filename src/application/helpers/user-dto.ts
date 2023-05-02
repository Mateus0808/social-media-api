import { GetUserByIdResponse } from './../interfaces/user-interface/get-user-by-id-service.interface'
import { CreateUserResponse } from '../interfaces/user-interface/create-user-service-interface'
import { ListUsersServiceResponse } from '../interfaces/user-interface/list-users-service-interface'
import {
  CreatedUserModel,
  UserDbModel,
} from '../ports/repositories/models/user-model'
import { LoadUsersRepositoryResponse } from '../ports/repositories/user/load-users-repository-interface'

export const userCreatedDto = (
  userCreated: CreatedUserModel,
): CreateUserResponse => ({
  id: userCreated.id,
  name: userCreated.name,
  lastName: userCreated.lastName,
  username: userCreated.username,
  gender: userCreated.gender,
  maritalStatus: userCreated.maritalStatus,
  birthDate: userCreated.birthDate,
  phone: userCreated.phone,
  email: userCreated.email,
  followers: userCreated.followers,
  followings: userCreated.followings,
  isPrivate: userCreated.isPrivate,
  status: userCreated.status,
  createdAt: userCreated.createdAt,
})

export const userDto = (user: UserDbModel): GetUserByIdResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  username: user.username,
  birthDate: user.birthDate,
  lastName: user.lastName,
  phone: user.phone,
  gender: user.gender,
  followers: user.followers,
  followings: user.followings,
  maritalStatus: user.maritalStatus,
  profile: user.profile,
  isPrivate: user.isPrivate,
  status: user.status,
  createdAt: new Date(user.createdAt),
  updatedAt: new Date(user.updatedAt),
})

export const fixName = (name: string | undefined): string => {
  if (!name) {
    return ''
  }

  return name
    .trim()
    .split(' ')
    .reduce((acc, val) => {
      const firstLetter = val.charAt(0).toUpperCase()
      return `${acc + val.replace(/^[a-zA-Z]/g, firstLetter)} `
    }, '')
    .trim()
}

export const fixToLowerCase = (username: string): string => {
  return username.trim().replace(' ', '_').toLowerCase()
}

export const userToPaginationDto = (
  param: LoadUsersRepositoryResponse,
): ListUsersServiceResponse => ({
  users: param.users.map(user => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      status: user.status,
      followers: user.followers,
      followings: user.followings,
      registrationDate: new Date(user.createdAt),
    }
  }),
  pagination: param.pagination,
})

export const userEmailDto = (user: { email: string; id: string }) => ({
  id: user.id,
  email: user.email,
})
