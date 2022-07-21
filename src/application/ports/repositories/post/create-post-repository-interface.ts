import { CreatedPostModel } from '../models/post-model'
import { CreatePostParams } from '../../../interfaces/post-interface/create-post-service-interface'

export interface CreatePostRepositoryParams
  extends Omit<CreatePostParams, 'userId'> {
  user: string
}

export interface CreatePostRepositoryInterface {
  createPost: (
    createPostRepository: CreatePostRepositoryParams,
  ) => Promise<CreatedPostModel | null>
}
