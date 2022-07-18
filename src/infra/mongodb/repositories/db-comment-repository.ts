import { CommentDbModel } from './../../../application/ports/repositories/models/comment-model';
import { CreateCommentRepositoryParams } from './../../../application/ports/repositories/comment/create-comment-repository-interface';
import { UserDbModel } from '../../../application/ports/repositories/models/user-model'
import { CreateUserRepositoryInterface, CreateUserRepositoryParams } from '../../../application/ports/repositories/user/create-user-repository-interface'
import { MongoHelper } from '../helpers/mongo-helper'
import { CreateCommentRepositoryInterface } from '../../../application/ports/repositories/comment/create-comment-repository-interface'
import { CommentModel } from '../models/comment-model';

export class CommentRepository implements CreateCommentRepositoryInterface {
  async createComment (createCommentRepositoryParams: CreateCommentRepositoryParams): Promise<CommentDbModel | null> {
    const { comment, userId, postId } = createCommentRepositoryParams;
    const commentCreated = await CommentModel.create({
      comment, user: userId, post: "62d44c967b239150327eb43d"
    })
    if (!commentCreated) {
      return null
    }
    return MongoHelper.mapToId(commentCreated.toObject())
  }
}
