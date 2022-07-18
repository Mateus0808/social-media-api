import { UserModel } from '../models/user-model'
import { UserDbModel } from '../../../application/ports/repositories/models/user-model'
import { CreateUserRepositoryInterface, CreateUserRepositoryParams } from '../../../application/ports/repositories/user/create-user-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../../application/ports/repositories/user/load-user-by-email-repository-interface'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadUsersRepositoryParams, LoadUsersRepositoryResponse } from '../../../application/ports/repositories/user/load-users-repository-interface'

export class UserRepository implements LoadUserByEmailRepositoryInterface,
CreateUserRepositoryInterface {
  async createUser (createUserRepositoryParams: CreateUserRepositoryParams): Promise<UserDbModel | null> {
    const userCreated = await UserModel.create({ ...createUserRepositoryParams })
    if (!userCreated) {
      return null
    }
    return MongoHelper.mapToId(userCreated.toObject())
  }

  async loadByEmail (email: string): Promise<UserDbModel | null> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return null
    }
    return MongoHelper.mapToId(user.toObject())
  }

  async loadById (id: string): Promise<UserDbModel | null> {
    const user = await UserModel.findOne({ _id: id })
    if (!user) {
      return null
    }
    return MongoHelper.mapToId(user.toObject())
  }

  async loadUsers(loadUsersRepositoryParams: LoadUsersRepositoryParams): Promise<LoadUsersRepositoryResponse | null> {
    const { page, limit } = loadUsersRepositoryParams

    const users = await UserModel.paginate({
      page: page ?? 1,
      limit: limit ?? 25
    })

    if (!users) {
      return null
    }

    const { docs, ...restUsersProps } = users

    const usersArray = docs.map(user => MongoHelper.mapToId(user))

    const response: LoadUsersRepositoryResponse = {
      users: usersArray,
      pagination: { ...restUsersProps }
    }

    return response
  }
}
