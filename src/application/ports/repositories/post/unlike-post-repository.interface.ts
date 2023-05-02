import { PostDbModel } from '../models/post-model'

export interface UnlikePostRepositoryParams {
  userId: string
  postId: string
}

export interface UnlikePostRepositoryInterface {
  unlikePost(params: UnlikePostRepositoryParams): Promise<PostDbModel | null>
}
