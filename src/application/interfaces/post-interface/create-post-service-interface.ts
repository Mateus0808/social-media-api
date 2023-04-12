import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface CreatePostParams {
  userId: string
  caption: string
  image: string
}

export interface CreatePostServiceInterface {
  createPost: (params: CreatePostParams) => Promise<PostDbModel>
}
