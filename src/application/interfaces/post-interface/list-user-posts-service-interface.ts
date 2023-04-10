import { UserDbModel } from '../../ports/repositories/models/user-model'

export interface ListUserPostsServiceParams {
  userId: string
  page: string | null
  limit: string | null
}

interface PostsServiceResponse {
  id: string
  title: string
  content: string
  likes: Array<string>
  comments: Array<string>
  user: UserDbModel
  createdAt: Date
  updatedAt: Date
}

export interface ListUserPostsServiceResponse {
  posts: PostsServiceResponse[]
  pagination: any
}

export interface ListUserPostsServiceInterface {
  listUserPosts: (
    listUserPostsParams: ListUserPostsServiceParams,
  ) => Promise<ListUserPostsServiceResponse>
}
