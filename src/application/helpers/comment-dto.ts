import { ListCommentsServiceResponse } from '../interfaces/comment-interface/list-comments-service-interface'
import { LoadCommentsRepositoryResponse } from '../ports/repositories/comment/load-comments-repository-interface'
import { CommentDbModel } from '../ports/repositories/models/comment-model'

export const commentDto = (comment: CommentDbModel): CommentDbModel => ({
  id: comment.id,
  userId: comment.userId,
  postId: comment.postId,
  text: comment.text,
  likes: comment.likes,
  createdAt: comment.createdAt,
  updatedAt: new Date(comment.updatedAt),
})

export const commentsToPaginationDto = (
  param: LoadCommentsRepositoryResponse,
): ListCommentsServiceResponse => ({
  comments: param.comments.map(comment => {
    return {
      id: comment.id,
      userId: comment.userId,
      postId: comment.postId,
      text: comment.text,
      likes: comment.likes,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    }
  }),
  pagination: param.pagination,
})
