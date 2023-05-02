import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface GetPostByIdServiceInterface {
  getPostById: (id: string) => Promise<PostDbModel>
}
