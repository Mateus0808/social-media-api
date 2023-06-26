import { CommentDbModel } from '../models/comment-model'

export interface LikeCommentRepositoryParams {
  commentId: string
  userId: string
}

export interface ILikeCommentRepository {
  likeComment: (
    params: LikeCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
