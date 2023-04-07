import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { CommentNotUpdatedError } from '../../errors/comment-errors/comment-not-updated-error'
import { UpdateCommentRepositoryInterface } from '../../ports/repositories/comment/update-comment-repository-interface'
import {
  UpdateCommentServiceInterface,
  UpdateCommentServiceParams,
  UpdateCommentServiceResponse,
} from '../../interfaces/comment-interface/update-comment-service-interface'

export class UpdateCommentService implements UpdateCommentServiceInterface {
  constructor(
    private readonly commentRepository: UpdateCommentRepositoryInterface,
    private readonly userRepository: LoadUserByIdRepositoryInterface,
  ) {}

  async updateComment(
    commentParams: UpdateCommentServiceParams,
  ): Promise<UpdateCommentServiceResponse> {
    const { commentId, postId, userId, comment } = commentParams

    const userAlreadyExists = await this.userRepository.loadById(userId)
    if (!userAlreadyExists) throw new UserNotFoundError()

    const commentUpdated = await this.commentRepository.updateComment({
      comment,
      commentId,
    })
    if (!commentUpdated) throw new CommentNotUpdatedError()

    return commentUpdated
  }
}
