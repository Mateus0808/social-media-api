import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface ListUserPostsServiceParams {
  userId: string
  page: string | null
  limit: string | null
}

export interface ListUserPostsServiceResponse {
  posts: PostDbModel[]
  pagination: any
}

export interface ListUserPostsServiceInterface {
  listUserPosts: (
    listUserPostsParams: ListUserPostsServiceParams,
  ) => Promise<ListUserPostsServiceResponse>
}
