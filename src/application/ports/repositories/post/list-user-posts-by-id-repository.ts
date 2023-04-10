import { PostDbModel } from '../models/post-model'

export interface ListUserPostsByIdRepositoryParams {
  userId: string
  page: number | null
  limit: number | null
}

export interface ListUserPostsByIdRepositoryResponse {
  posts: PostDbModel[]
  pagination: any
}

export interface ListUserPostsByIdRepositoryInterface {
  listUserPostsById: (
    params: ListUserPostsByIdRepositoryParams,
  ) => Promise<ListUserPostsByIdRepositoryResponse | null>
}
