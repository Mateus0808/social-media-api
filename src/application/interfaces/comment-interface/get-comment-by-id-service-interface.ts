import { CommentDbModel } from '@application/ports/repositories/models/comment-model'

export interface GetCommentByIdServiceInterface {
  getCommentById: (commentId: string) => Promise<CommentDbModel>
}
