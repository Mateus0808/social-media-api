import { PostDbModel } from '../models/post-model'

export interface LoadPostsFromUserByIdRepositoryParams {
  userId: string
}

export interface LoadPostsFromUserByIdRepositoryResponse {
  posts: Array<PostDbModel>
  pagination: any
}

export interface LoadPostsFromUserByIdRepositoryInterface {
  loadPostsFromUserById: (
    repositoryParams: LoadPostsFromUserByIdRepositoryParams,
  ) => Promise<Array<PostDbModel> | null>
}
