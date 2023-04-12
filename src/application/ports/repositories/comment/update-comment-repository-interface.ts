import { CommentDbModel } from '../models/comment-model'

export interface UpdateCommentRepositoryParams {
  commentId: string
  text: string
}

export interface UpdateCommentRepositoryInterface {
  updateComment: (
    params: UpdateCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
