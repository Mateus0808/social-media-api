import { PostDbModel } from './../../ports/repositories/models/post-model';
import { UserDbModel } from "../../ports/repositories/models/user-model"

export interface ListPostServiceParams {
  page: string | null
  limit: string | null
}

export interface ListPostsServiceResponse {
  posts: PostServiceResponse[]
  pagination: any
}

interface PostServiceResponse {
  id: string
  title: string
  content: string
  likes: Array<string>
  user: UserDbModel
  createdAt: Date
  updatedAt: Date
}

export interface ListPostsServiceInterface {
  listPosts: (listPostServiceParams: ListPostServiceParams) 
    => Promise<ListPostsServiceResponse>;
}