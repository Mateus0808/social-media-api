import { CommentDbModel } from '../models/comment-model'

export interface GetCommentByIdRepositoryInterface {
  getCommentById: (commentId: string) => Promise<CommentDbModel | null>
}
