import { CreateCommentResponse } from '../interfaces/post-interface/comment-interface/create-comment-service-interface'
import { ListCommentsServiceResponse } from '../interfaces/post-interface/comment-interface/list-comments-service-interface'
import { LoadCommentsRepositoryResponse } from '../ports/repositories/post/comment/load-comments-repository-interface'
import { CommentDbModel } from '../ports/repositories/models/comment-model'

export const commentCreatedDto = (commentCreated: CommentDbModel): CreateCommentResponse => ({
  id: commentCreated.id,
  user: commentCreated.user,
  comment: commentCreated.comment,
  likes: commentCreated.likes,
  createdAt: commentCreated.createdAt,
})

export const commentsToPaginationDto = (
  param: LoadCommentsRepositoryResponse
): ListCommentsServiceResponse => ({
  comments: param.comments.map(comment => {
    return {
      id: comment.id,
      comment: comment.comment,
      likes: comment.likes,
      user: comment.user,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt)
    }
  }),
  pagination: param.pagination
})