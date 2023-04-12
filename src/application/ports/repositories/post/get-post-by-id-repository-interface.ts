import { CommentDbModel } from '../models/comment-model'

export interface GetPostByIdRepositoryInterface {
  getPostById: (postId: string) => Promise<CommentDbModel | null>
}
