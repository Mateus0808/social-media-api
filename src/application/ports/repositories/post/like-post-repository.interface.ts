import { PostDbModel } from '../models/post-model'

export interface LikePostRepositoryParams {
  userId: string
  postId: string
}

export interface LikePostRepositoryInterface {
  likePost(params: LikePostRepositoryParams): Promise<PostDbModel | null>
}
