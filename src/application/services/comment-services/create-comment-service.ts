import { CommentNotCreatedError } from '../../errors/comment-errors/comment-not-created-error'
import { UserNotAuthorizedError } from '../../errors/user-not-authorized-error'
import { commentCreatedDto } from '../../helpers/comment-dto'
import { CreateCommentRepositoryInterface } from '../../ports/repositories/comment/create-comment-repository-interface'
import {
  CreateCommentParams,
  CreateCommentResponse,
  CreateCommentServiceInterface,
} from '../../interfaces/comment-interface/create-comment-service-interface'
import { UpdatePostCommentsRepositoryInterface } from '../../ports/repositories/post/update-post-comments-repository-interface'
import { PostUpdateCommentError } from '../../errors/post-errors/post-update-comments-error'

export class CreateCommentService implements CreateCommentServiceInterface {
  constructor(
    private readonly commentRepository: CreateCommentRepositoryInterface,
    private readonly postRepository: UpdatePostCommentsRepositoryInterface,
  ) {}

  async createComment(
    createCommentParams: CreateCommentParams,
  ): Promise<CreateCommentResponse> {
    const { comment, userId, postId, currentUserId } = createCommentParams

    if (currentUserId !== userId) throw new UserNotAuthorizedError()

    const commentCreated = await this.commentRepository.createComment({
      comment,
      userId,
      postId,
    })
    if (!commentCreated) throw new CommentNotCreatedError(comment)

    const updatePostComments = await this.postRepository.updatePostComments({
      postId,
      commentId: commentCreated.id,
    })
    if (!updatePostComments) throw new PostUpdateCommentError()

    return commentCreatedDto(commentCreated)
  }
}
