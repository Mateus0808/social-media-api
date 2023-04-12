import { PostDbModel } from './../../ports/repositories/models/post-model'

export interface ListPostServiceParams {
  page: string | null
  limit: string | null
}

export interface ListPostsServiceResponse {
  posts: PostDbModel[]
  pagination: any
}

export interface ListPostsServiceInterface {
  listPosts: (
    listPostServiceParams: ListPostServiceParams,
  ) => Promise<ListPostsServiceResponse>
}
