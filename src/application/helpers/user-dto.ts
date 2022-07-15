import { CreateUserResponse } from '../interfaces/create-user-service-interface'
import { CreatedUserModel } from '../ports/repositories/models/user-model'

export const userCreatedDto = (userCreated: CreatedUserModel): CreateUserResponse => ({
  id: userCreated.id,
  name: userCreated.name,
  lastName: userCreated.lastName,
  gender: userCreated.gender,
  phone: userCreated.phone,
  email: userCreated.email,
  status: userCreated.status
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
