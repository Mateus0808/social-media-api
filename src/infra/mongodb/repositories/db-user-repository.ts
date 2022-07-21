import { UserModel } from '../models/user-model'
import { UserDbModel } from '../../../application/ports/repositories/models/user-model'
import {
  CreateUserRepositoryInterface,
  CreateUserRepositoryParams,
} from '../../../application/ports/repositories/user/create-user-repository-interface'
import { LoadUserByEmailRepositoryInterface } from '../../../application/ports/repositories/user/load-user-by-email-repository-interface'
import { MongoHelper } from '../helpers/mongo-helper'
import {
  LoadUsersRepositoryInterface,
  LoadUsersRepositoryParams,
  LoadUsersRepositoryResponse,
} from '../../../application/ports/repositories/user/load-users-repository-interface'
import { LoadUserByIdRepositoryInterface } from '../../../application/ports/repositories/user/load-user-by-id-repository-interface'
import {
  FollowUserRepositoryParams,
  UpdateFollowUserRepositoryInterface,
} from '../../../application/ports/repositories/user/follow-user-repository-interface'

export class UserRepository
  implements
    LoadUserByEmailRepositoryInterface,
    CreateUserRepositoryInterface,
    LoadUserByIdRepositoryInterface,
    LoadUsersRepositoryInterface,
    UpdateFollowUserRepositoryInterface
{
  async createUser(
    createUserRepositoryParams: CreateUserRepositoryParams,
  ): Promise<UserDbModel | null> {
    const userCreated = await UserModel.create({
      ...createUserRepositoryParams,
    })
    if (!userCreated) {
      return null
    }
    return MongoHelper.mapToId(userCreated.toObject())
  }

  async loadByEmail(email: string): Promise<UserDbModel | null> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return null
    }
    return MongoHelper.mapToId(user.toObject())
  }

  async loadById(id: string): Promise<UserDbModel | null> {
    const user = await UserModel.findOne({ _id: id })
    if (!user) {
      return null
    }
    return MongoHelper.mapToId(user.toObject())
  }

  async loadUsers(
    loadUsersRepositoryParams: LoadUsersRepositoryParams,
  ): Promise<LoadUsersRepositoryResponse | null> {
    const { page, limit } = loadUsersRepositoryParams

    const users = await UserModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10,
    })

    if (!users) {
      return null
    }

    const { docs, ...restUsersProps } = users

    const usersArray = docs.map(user => MongoHelper.mapToId(user))

    const response: LoadUsersRepositoryResponse = {
      users: usersArray,
      pagination: { ...restUsersProps },
    }

    return response
  }

  async updateFollowUser(
    followUser: FollowUserRepositoryParams,
  ): Promise<UserDbModel | null> {
    let response: UserDbModel

    const { currentUserId, userId } = followUser

    const currentUser = await UserModel.findById(currentUserId)
    if (!currentUser) {
      return null
    }

    const userIWillFollow = await UserModel.findById(userId)
    if (!userIWillFollow) {
      return null
    }

    if (!currentUser.followings.includes(userId)) {
      response = await currentUser.updateOne(
        { $push: { followings: userId } },
        { new: true },
      )
      await userIWillFollow.updateOne({ $push: { followers: currentUserId } })
    } else {
      response = await currentUser.updateOne(
        { $pull: { followings: userId } },
        { new: true },
      )
      await userIWillFollow.updateOne({ $pull: { followers: currentUserId } })
    }

    return response
  }
}
