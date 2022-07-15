import { UserModel } from '../models/user-model'
import { UserDbModel } from '../../../application/ports/repositories/models/user-model'
import { CreateUserRepositoryInterface, CreateUserRepositoryParams } from '../../../application/ports/repositories/user/create-user-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../../application/ports/repositories/user/load-user-by-email-repository-interface'
import { MongoHelper } from '../helpers/mongo-helper'

export class UserRepository implements LoadUserByEmailRepositoryInterface,
CreateUserRepositoryInterface {
  async createUser (createUserRepositoryParams: CreateUserRepositoryParams): Promise<UserDbModel | null> {
    const userCreated = await UserModel.create(createUserRepositoryParams)
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
}
