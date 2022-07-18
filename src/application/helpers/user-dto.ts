import { CreateUserResponse } from '../interfaces/create-user-service-interface'
import { ListOneUserResponse } from '../interfaces/list-one-user-service-interface'
import { ListUsersServiceResponse } from '../interfaces/list-users-service-interface'
import { CreatedUserModel, UserDbModel } from '../ports/repositories/models/user-model'
import { LoadUsersRepositoryResponse } from '../ports/repositories/user/load-users-repository-interface'

export const userCreatedDto = (userCreated: CreatedUserModel): CreateUserResponse => ({
  id: userCreated.id,
  name: userCreated.name,
  lastName: userCreated.lastName,
  gender: userCreated.gender,
  maritalStatus: userCreated.maritalStatus,
  birthDate: userCreated.birthDate,
  phone: userCreated.phone,
  email: userCreated.email,
  status: userCreated.status
})


export const userDto = (user: UserDbModel): ListOneUserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  birthDate: user.birthDate,
  lastName: user.lastName,
  phone: user.phone,
  address: user.address,
  gender: user.gender,
  isAdmin: user.isAdmin,
  maritalStatus: user.maritalStatus,
  status: user.status,
  registrationDate: new Date(user.createdAt)
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
      return acc + val.replace(/^[a-zA-Z]/g, firstLetter) + ' '
    }, '').trim()
}


export const userToPaginationDto = (param: LoadUsersRepositoryResponse): ListUsersServiceResponse => ({
  users: param.users.map(user => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      status: user.status,
      registrationDate: new Date(user.createdAt)
    }
  }),
  pagination: param.pagination
})
