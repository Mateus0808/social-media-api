import { commentDto } from './../../helpers/comment-dto'
import { CommentNotFoundError } from '@application/errors/comment-errors/comment-not-found-error'
import { GetCommentByIdServiceInterface } from '@application/interfaces/comment-interface/get-comment-by-id-service-interface'
import { GetCommentByIdRepositoryInterface } from '@application/ports/repositories/comment/get-comment-by-id-repository-interface'
import { CommentDbModel } from '@application/ports/repositories/models/comment-model'

export class GetCommentByIdService implements GetCommentByIdServiceInterface {
  constructor(private commentRepository: GetCommentByIdRepositoryInterface) {}

  async getCommentById(commentId: string): Promise<CommentDbModel> {
    const comment = await this.commentRepository.getCommentById(commentId)
    if (!comment) throw new CommentNotFoundError()

    return commentDto(comment)
  }
}
