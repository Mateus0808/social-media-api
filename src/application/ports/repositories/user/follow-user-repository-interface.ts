import { FollowUserParams } from './../../../interfaces/follow-user-service-interface';
import { UserDbModel } from '../models/user-model'

export interface FollowUserRepositoryParams extends FollowUserParams {}

export interface UpdateFollowUserRepositoryInterface {
  updateFollowUser: (followUser: FollowUserRepositoryParams) => Promise<UserDbModel | null>
}
