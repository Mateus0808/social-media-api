import { CreateCommentParams } from '../../../../interfaces/post-interface/comment-interface/create-comment-service-interface'
import { CommentDbModel } from '../../models/comment-model'

export type CreateCommentRepositoryParams = Omit<CreateCommentParams, 'postId'>

export interface CreateCommentRepositoryInterface {
  createComment: (
    createCommentRepositoryParams: CreateCommentRepositoryParams,
  ) => Promise<CommentDbModel | null>
}
