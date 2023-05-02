import { CommentDbModel } from '../models/comment-model'

export interface UpdateCommentRepositoryParams {
  commentId: string
  comment: string
}

export interface UpdateCommentRepositoryInterface {
  updateComment: (
    params: UpdateCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
