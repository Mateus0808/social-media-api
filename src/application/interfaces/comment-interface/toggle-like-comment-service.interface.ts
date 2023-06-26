import { CommentDbModel } from './../../ports/repositories/models/comment-model'

export interface ToggleLikeCommentServiceParams {
  userId: string
  postId: string
  commentId: string
}

export type ToggleLikeCommentServiceResponse = CommentDbModel

export interface ToggleLikeCommentServiceInterface {
  toggleLike: (
    params: ToggleLikeCommentServiceParams,
  ) => Promise<ToggleLikeCommentServiceResponse>
}
