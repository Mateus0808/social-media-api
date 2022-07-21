import { PostDbModel } from '../models/post-model'

export interface LoadPostsRepositoryParams {
  page: number | null
  limit: number | null
}

export interface LoadPostsRepositoryResponse {
  posts: PostDbModel[]
  pagination: any
}

export interface LoadPostsRepositoryInterface {
  loadPosts: (
    loadPostsRepositoryParams: LoadPostsRepositoryParams,
  ) => Promise<LoadPostsRepositoryResponse | null>
}
