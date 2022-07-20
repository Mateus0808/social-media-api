import { UserDbModel } from '../../ports/repositories/models/user-model';
import { CommentDbModel } from './../../ports/repositories/models/comment-model';

export interface CreatePostParams {
  title: string
  content: string
  userId: string
}

export interface CreatePostResponse {
  id: string
  title: string
  content: string
  likes: Array<string>
  comments: Array<string>
  user: UserDbModel
  createdAt: Date
}

export interface CreatePostServiceInterface {
  createPost: (createPostParams: CreatePostParams) 
    => Promise<CreatePostResponse>
}