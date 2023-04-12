import { GetCommentByIdRepositoryInterface } from '@application/ports/repositories/comment/get-comment-by-id-repository-interface'
import {
  UpdateCommentRepositoryInterface,
  UpdateCommentRepositoryParams,
} from '../../../application/ports/repositories/comment/update-comment-repository-interface'
import { DeleteCommentRepositoryInterface } from '../../../application/ports/repositories/comment/delete-comment-repository-interface'
import {
  LoadCommentsRepositoryInterface,
  LoadCommentsRepositoryParams,
  LoadCommentsRepositoryResponse,
} from '../../../application/ports/repositories/comment/load-comments-repository-interface'
import { CommentDbModel } from '../../../application/ports/repositories/models/comment-model'
import {
  CreateCommentRepositoryParams,
  CreateCommentRepositoryInterface,
} from '../../../application/ports/repositories/comment/create-comment-repository-interface'
import { MongoHelper } from '../helpers/mongo-helper'

import { CommentModel } from '../models/comment-model'

export class CommentRepository
  implements
    CreateCommentRepositoryInterface,
    LoadCommentsRepositoryInterface,
    DeleteCommentRepositoryInterface,
    UpdateCommentRepositoryInterface,
    GetCommentByIdRepositoryInterface
{
  async getCommentById(commentId: string): Promise<CommentDbModel | null> {
    const comment = await CommentModel.findById(commentId)
    if (!comment) return null

    return MongoHelper.mapToId(comment.toObject())
  }

  async createComment(
    createCommentRepositoryParams: CreateCommentRepositoryParams,
  ): Promise<CommentDbModel | null> {
    const { text, userId, postId } = createCommentRepositoryParams
    const commentCreated = await CommentModel.create({
      text,
      userId,
      postId,
    })
    if (!commentCreated) return null

    return MongoHelper.mapToId(commentCreated.toObject())
  }

  async listComments(
    listCommentsRepositoryParams: LoadCommentsRepositoryParams,
  ): Promise<LoadCommentsRepositoryResponse | null> {
    const { page, limit } = listCommentsRepositoryParams

    const comments = await CommentModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10,
    })

    if (!comments) return null

    const { docs, ...restCommentsProps } = comments
    const commentsArray = docs.map(comment => MongoHelper.mapToId(comment))

    const response: LoadCommentsRepositoryResponse = {
      comments: commentsArray,
      pagination: { ...restCommentsProps },
    }

    return response
  }

  async deleteComment(commentId: string): Promise<boolean | null> {
    const commentDeleted = await CommentModel.findByIdAndDelete(commentId)
    if (!commentDeleted) return null

    return true
  }

  async updateComment(
    params: UpdateCommentRepositoryParams,
  ): Promise<CommentDbModel | null> {
    const { commentId, text } = params

    const commentUpdated = await CommentModel.findByIdAndUpdate(
      commentId,
      {
        $set: { text },
      },
      { new: true },
    )
    if (!commentUpdated) return null

    return MongoHelper.mapToId(commentUpdated.toObject())
  }
}
