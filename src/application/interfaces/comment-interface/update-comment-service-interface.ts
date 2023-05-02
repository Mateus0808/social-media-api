import { CommentDbModel } from './../../ports/repositories/models/comment-model'

export interface UpdateCommentServiceParams {
  commentId: string
  postId: string
  userId: string
  comment: string
}

export interface UpdateCommentServiceInterface {
  updateComment: (params: UpdateCommentServiceParams) => Promise<CommentDbModel>
}
