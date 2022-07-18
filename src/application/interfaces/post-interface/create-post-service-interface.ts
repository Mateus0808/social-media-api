import { UserDbModel } from '../../ports/repositories/models/user-model';
import { CommentDbModel } from './../../ports/repositories/models/comment-model';

export interface  CreatePostServiceParams {
  title: string
  content: string
  userId: string
}

export interface CreatePostServiceResponse {
  id: string
  title: string
  content: string
  totalLikes: number
  user: UserDbModel
}

export interface CreatePostServiceInterface {
  createPost: (createPostServiceParams: CreatePostServiceParams) => Promise<CreatePostServiceResponse>
}