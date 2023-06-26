import { PostDbModel } from '@application/ports/repositories/models/post-model'
import { postDto } from './../../helpers/post-dto'
import { CommentNotCreatedError } from '../../errors/comment-errors/comment-not-created-error'
import { UserNotAuthorizedError } from '../../errors/user-not-authorized-error'
import { CreateCommentRepositoryInterface } from '../../ports/repositories/comment/create-comment-repository-interface'
import {
  CreateCommentParams,
  CreateCommentServiceInterface,
} from '../../interfaces/comment-interface/create-comment-service-interface'
import { UpdatePostCommentsRepositoryInterface } from '../../ports/repositories/post/update-post-comments-repository-interface'
import { PostUpdateCommentError } from '../../errors/post-errors/post-update-comments-error'

export class CreateCommentService implements CreateCommentServiceInterface {
  constructor(
    private readonly commentRepository: CreateCommentRepositoryInterface,
    private readonly postRepository: UpdatePostCommentsRepositoryInterface,
  ) {}

  async createComment(params: CreateCommentParams): Promise<PostDbModel> {
    const { comment, userId, postId, currentUserId } = params

    if (currentUserId !== userId) throw new UserNotAuthorizedError()

    const commentCreated = await this.commentRepository.createComment({
      comment,
      userId,
      postId,
    })
    if (!commentCreated) throw new CommentNotCreatedError()

    const updatePostComments = await this.postRepository.updatePostComments({
      postId,
      commentId: commentCreated.id,
    })
    if (!updatePostComments) throw new PostUpdateCommentError()

    return postDto(updatePostComments)
  }
}
