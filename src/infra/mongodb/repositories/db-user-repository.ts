import { LoadUserByUsernameRepositoryInterface } from '../../../application/ports/repositories/user/load-user-by-username-repository-interface'
import {
  UpdateUserUsernameRepositoryInterface,
  UpdateUserUsernameRepositoryParams,
  UpdateUserUsernameRepositoryResponse,
} from '../../../application/ports/repositories/user/update-user-username-repository-interface'
import {
  UpdateUserNameRepositoryInterface,
  UpdateUserNameRepositoryParams,
  UpdateUserNameRepositoryResponse,
} from '../../../application/ports/repositories/user/update-user-name-repository-interface'
import {
  UpdateUserEmailRepositoryParams,
  UpdateUserEmailRepositoryInterface,
  UpdateUserEmailRepositoryResponse,
} from '../../../application/ports/repositories/user/update-user-email-repository-interface'
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
    UpdateFollowUserRepositoryInterface,
    UpdateUserEmailRepositoryInterface,
    UpdateUserNameRepositoryInterface,
    UpdateUserUsernameRepositoryInterface,
    LoadUserByUsernameRepositoryInterface
{
  async createUser(
    createUserRepositoryParams: CreateUserRepositoryParams,
  ): Promise<UserDbModel | null> {
    const userCreated = await UserModel.create({
      ...createUserRepositoryParams,
      populate: 'UserProfile',
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

  async updateUserEmail(
    updateUserEmailRepositoryParams: UpdateUserEmailRepositoryParams,
  ): Promise<UpdateUserEmailRepositoryResponse | null> {
    const { userId, email } = updateUserEmailRepositoryParams

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { email },
      },
      { new: true },
    ).select({ email: 1, _id: 1 })

    if (!user) return null

    return MongoHelper.mapToId(user.toObject())
  }

  async updateUserName(
    updateUserNameRepositoryParams: UpdateUserNameRepositoryParams,
  ): Promise<UpdateUserNameRepositoryResponse | null> {
    const { userId, name, lastName } = updateUserNameRepositoryParams

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { name, lastName },
      },
      { new: true },
    ).select({ name: 1, lastName: 1, _id: 1 })

    if (!user) return null

    return MongoHelper.mapToId(user.toObject())
  }

  async updateUserUsername(
    updateUserUsernameRepositoryParams: UpdateUserUsernameRepositoryParams,
  ): Promise<UpdateUserUsernameRepositoryResponse | null> {
    const { userId, username } = updateUserUsernameRepositoryParams

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { username },
      },
      { new: true },
    ).select({ username: 1, _id: 1 })

    if (!user) return null

    return MongoHelper.mapToId(user.toObject())
  }

  async loadUserByUsername(username: string): Promise<UserDbModel | null> {
    const user = await UserModel.findOne({ username })
    if (!user) return null

    return MongoHelper.mapToId(user.toObject())
  }
}
