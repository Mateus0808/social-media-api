import { CommentDbModel } from '../models/comment-model';
import { CreateCommentParams } from './../../../interfaces/comment-interface/create-comment-service-interface';

export interface CreateCommentRepositoryParams extends CreateCommentParams {}

export interface CreateCommentRepositoryInterface {
  createComment: (createCommentRepositoryParams: CreateCommentRepositoryParams)
    => Promise<CommentDbModel | null>
} 