import { CommentDbModel } from './../../ports/repositories/models/comment-model'

export interface CreateCommentParams {
  userId: string
  postId: string
  currentUserId: string
  comment: string
}

export interface CreateCommentServiceInterface {
  createComment: (params: CreateCommentParams) => Promise<CommentDbModel>
}
