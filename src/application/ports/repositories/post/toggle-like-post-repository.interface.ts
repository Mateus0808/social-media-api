import { LikePostRepositoryInterface } from './like-post-repository.interface'
import { UnlikePostRepositoryInterface } from './unlike-post-repository.interface'

export interface IToggleLikePostRepository
  extends LikePostRepositoryInterface,
    UnlikePostRepositoryInterface {}
