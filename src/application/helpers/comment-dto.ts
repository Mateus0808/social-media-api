import { CreateCommentResponse } from '../interfaces/comment-interface/create-comment-service-interface'
import { CommentDbModel } from '../ports/repositories/models/comment-model'

export const commentCreatedDto = (commentCreated: CommentDbModel): CreateCommentResponse => ({
  id: commentCreated.id,
  post: commentCreated.post,
  user: commentCreated.user,
  comment: commentCreated.comment,
  totalLikes: commentCreated.totalLikes,
  createdAt: commentCreated.createdAt,
})