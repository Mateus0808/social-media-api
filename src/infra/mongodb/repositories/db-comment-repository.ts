import { LoadCommentsRepositoryInterface, LoadCommentsRepositoryParams, LoadCommentsRepositoryResponse } from '../../../application/ports/repositories/post/comment/load-comments-repository-interface';
import { CommentDbModel } from './../../../application/ports/repositories/models/comment-model';
import { CreateCommentRepositoryParams } from '../../../application/ports/repositories/post/comment/create-comment-repository-interface';
import { MongoHelper } from '../helpers/mongo-helper'
import { CreateCommentRepositoryInterface } from '../../../application/ports/repositories/post/comment/create-comment-repository-interface'
import { CommentModel } from '../models/comment-model';

export class CommentRepository implements CreateCommentRepositoryInterface, LoadCommentsRepositoryInterface {
  async createComment (createCommentRepositoryParams: CreateCommentRepositoryParams)
  : Promise<CommentDbModel | null> {
    const { comment, userId } = createCommentRepositoryParams;
    const commentCreated = await CommentModel.create({
      comment, user: userId
    })
    if (!commentCreated) return null

    return MongoHelper.mapToId(commentCreated.toObject())
  }

  async listComments (listCommentsRepositoryParams: LoadCommentsRepositoryParams): Promise<LoadCommentsRepositoryResponse | null> {
    const { page, limit } = listCommentsRepositoryParams

    const comments = await CommentModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10
    })

    if (!comments) return null

    const { docs, ...restCommentsProps } = comments
    const commentsArray = docs.map(comment => MongoHelper.mapToId(comment))

    const response: LoadCommentsRepositoryResponse = {
      comments: commentsArray,
      pagination: { ...restCommentsProps }
    }
    return response
  }
}
