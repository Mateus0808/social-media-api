import { UserEntity } from "../../domain/entities/user-entity"

export interface FollowUserParams {
  currentUserId: string
  userId: string
}

export interface FollowUserServiceResponse {
  message: string
  success: boolean
}


export interface FollowUserServiceInterface {
  followUser: (followUser: FollowUserParams) => Promise<FollowUserServiceResponse>
}