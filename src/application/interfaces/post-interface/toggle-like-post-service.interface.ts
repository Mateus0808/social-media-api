import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface ToggleLikeServiceParams {
  userId: string
  postId: string
}

export interface ToggleLikePostServiceInterface {
  toggleLike: (params: ToggleLikeServiceParams) => Promise<PostDbModel>
}
