import { PostDbModel } from '@application/ports/repositories/models/post-model'

export interface CreateCommentParams {
  userId: string
  postId: string
  currentUserId: string
  comment: string
}

export interface CreateCommentServiceInterface {
  createComment: (params: CreateCommentParams) => Promise<PostDbModel>
}
