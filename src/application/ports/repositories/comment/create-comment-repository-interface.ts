import { CreateCommentParams } from '../../../interfaces/comment-interface/create-comment-service-interface'
import { CommentDbModel } from '../models/comment-model'

export type CreateCommentRepositoryParams = Omit<
  CreateCommentParams,
  'currentUserId'
>

export interface CreateCommentRepositoryInterface {
  createComment: (
    params: CreateCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
