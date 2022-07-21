import { FollowUserParams } from '../../../interfaces/follow-user-service-interface'
import { UserDbModel } from '../models/user-model'

export type FollowUserRepositoryParams = FollowUserParams

export interface UpdateFollowUserRepositoryInterface {
  updateFollowUser: (
    followUser: FollowUserRepositoryParams,
  ) => Promise<UserDbModel | null>
}
