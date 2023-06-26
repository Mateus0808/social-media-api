import { PostDbModel } from '../models/post-model'

export interface UpdatePostCommentsRepositoryParams {
  postId: string
  commentId: string
}

export type UpdatePostCommentsRepositoryResponse = PostDbModel

export interface UpdatePostCommentsRepositoryInterface {
  updatePostComments: (
    updatePostCommentsParams: UpdatePostCommentsRepositoryParams,
  ) => Promise<UpdatePostCommentsRepositoryResponse | null>
}
