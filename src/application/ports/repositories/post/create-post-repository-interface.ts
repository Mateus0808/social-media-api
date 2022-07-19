import { CreatedPostModel, PostDbModel } from './../models/post-model';
import { CreatePostParams } from './../../../interfaces/post-interface/create-post-service-interface';
import { UserDbModel } from '../models/user-model';

export interface CreatePostRepositoryParams extends Omit<CreatePostParams, 'userId'> {
  user: string
}

export interface CreatePostRepositoryInterface {
  createPost: (createPostRepository: CreatePostRepositoryParams) 
    => Promise<CreatedPostModel | null>
}