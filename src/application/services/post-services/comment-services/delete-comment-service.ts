import { CommentsNotFoundError } from '../../../errors/comment-errors/comment-not-found-error'
import { DeleteCommentRepositoryInterface } from '../../../ports/repositories/post/comment/delete-comment-repository-interface'
import { DeleteCommentOnAPostRepositoryInterface } from '../../../ports/repositories/post/delete-comment-on-a-post-repository-interface'
import {
  DeleteCommentServiceInterface,
  DeleteCommentServiceResponse,
  DeleteCommentParams,
} from '../../../interfaces/post-interface/comment-interface/delete-comment-service-interface'

export class DeleteCommentService implements DeleteCommentServiceInterface {
  constructor(
    private readonly postRepository: DeleteCommentOnAPostRepositoryInterface,
    private readonly commentRepository: DeleteCommentRepositoryInterface,
  ) {}

  async deleteComment(
    deleteCommentParams: DeleteCommentParams,
  ): Promise<DeleteCommentServiceResponse> {
    const { commentId, postId, userId } = deleteCommentParams
    const commentDeletedOnPost = await this.postRepository.deleteCommentOnAPost(
      { postId, userId },
    )
    if (!commentDeletedOnPost) throw new CommentsNotFoundError()

    const deletedComment = await this.commentRepository.deleteComment(commentId)
    if (!deletedComment) throw new CommentsNotFoundError()

    return {
      message: 'Comentário deletado com sucesso',
      success: true,
    }
  }
}
