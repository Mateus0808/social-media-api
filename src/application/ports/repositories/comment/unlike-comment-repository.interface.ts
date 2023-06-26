import { CommentDbModel } from '../models/comment-model'

export interface UnlikeCommentRepositoryParams {
  commentId: string
  userId: string
}

export interface IUnlikeCommentRepository {
  unlikeComment: (
    params: UnlikeCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
