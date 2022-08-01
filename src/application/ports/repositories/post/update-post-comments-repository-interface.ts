import { CommentDbModel } from '../models/comment-model'

export interface UpdatePostCommentsRepositoryParams {
  postId: string
  commentId: string
}

export type UpdatePostCommentsRepositoryResponse = CommentDbModel

export interface UpdatePostCommentsRepositoryInterface {
  updatePostComments: (
    updatePostCommentsParams: UpdatePostCommentsRepositoryParams,
  ) => Promise<UpdatePostCommentsRepositoryResponse | null>
}
