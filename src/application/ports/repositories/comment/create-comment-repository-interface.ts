import { CreateCommentParams } from '../../../interfaces/comment-interface/create-comment-service-interface'
import { CommentDbModel } from '../models/comment-model'

export type CreateCommentRepositoryParams = Omit<
  CreateCommentParams,
  'currentUserId'
>

export interface CreateCommentRepositoryInterface {
  createComment: (
    createCommentRepositoryParams: CreateCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}