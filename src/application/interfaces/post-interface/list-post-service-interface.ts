import { UserDbModel } from '../../ports/repositories/models/user-model'

export interface ListPostServiceParams {
  page: string | null
  limit: string | null
}

interface PostServiceResponse {
  id: string
  title: string
  content: string
  likes: Array<string>
  user: UserDbModel
  comments: Array<string>
  createdAt: Date
  updatedAt: Date
}

export interface ListPostsServiceResponse {
  posts: PostServiceResponse[]
  pagination: any
}

export interface ListPostsServiceInterface {
  listPosts: (
    listPostServiceParams: ListPostServiceParams,
  ) => Promise<ListPostsServiceResponse>
}
