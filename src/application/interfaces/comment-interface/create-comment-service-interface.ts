import { CommentDbModel } from './../../ports/repositories/models/comment-model'

export interface CreateCommentParams {
  userId: string
  postId: string
  currentUserId: string
  text: string
}

export interface CreateCommentServiceInterface {
  createComment: (params: CreateCommentParams) => Promise<CommentDbModel>
}
