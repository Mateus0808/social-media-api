import { GetCommentByIdRepositoryInterface } from '../../ports/repositories/comment/get-comment-by-id-repository-interface'
import { CommentNotBelongPostError } from '../../errors/comment-errors/comment-not-belong-post-error'
import { CommentNotDeletedError } from '../../errors/comment-errors/comment-not-deleted-error'
import { CommentNotDeletedOnPostError } from '../../errors/comment-errors/comment-not-deleted-on-post-error'
import { UserNotAuthorizedError } from '../../errors/user-not-authorized-error'
import { DeleteCommentRepositoryInterface } from '../../ports/repositories/comment/delete-comment-repository-interface'
import { DeleteCommentOnAPostRepositoryInterface } from '../../ports/repositories/post/delete-comment-on-a-post-repository-interface'
import { CommentNotFoundError } from '../../errors/comment-errors/comment-not-found-error'
import {
  DeleteCommentServiceInterface,
  DeleteCommentServiceResponse,
  DeleteCommentParams,
} from '../../interfaces/comment-interface/delete-comment-service-interface'

export class DeleteCommentService implements DeleteCommentServiceInterface {
  constructor(
    private readonly postRepository: DeleteCommentOnAPostRepositoryInterface,
    private readonly getCommentByIdRepository: GetCommentByIdRepositoryInterface,
    private readonly deleteCommentRepository: DeleteCommentRepositoryInterface,
  ) {}

  async deleteComment(
    params: DeleteCommentParams,
  ): Promise<DeleteCommentServiceResponse> {
    const { commentId, postId, userId, currentUserId } = params
    if (userId !== currentUserId) throw new UserNotAuthorizedError()

    const comment = await this.getCommentByIdRepository.getCommentById(
      commentId,
    )
    if (!comment) throw new CommentNotFoundError()

    if (comment.postId !== postId) throw new CommentNotBelongPostError()

    const post = await this.postRepository.deleteCommentOnAPost({
      postId,
      userId,
    })
    if (!post) throw new CommentNotDeletedOnPostError()

    const commentDeleted = await this.deleteCommentRepository.deleteComment(
      commentId,
    )
    if (!commentDeleted) throw new CommentNotDeletedError()

    return {
      message: 'Comentário excluído com sucesso',
      success: true,
    }
  }
}
