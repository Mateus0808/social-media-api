import { PostDbModel } from '../models/post-model'

export interface GetPostByIdRepositoryInterface {
  getPostById: (postId: string) => Promise<PostDbModel | null>
}
