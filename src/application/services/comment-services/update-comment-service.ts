import { commentDto } from './../../helpers/comment-dto'
import { PostNotFoundError } from './../../errors/post-errors/post-not-found-error'
import { GetPostByIdRepositoryInterface } from './../../ports/repositories/post/get-post-by-id-repository-interface'
import { CommentDbModel } from './../../ports/repositories/models/comment-model'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import { CommentNotUpdatedError } from '../../errors/comment-errors/comment-not-updated-error'
import { UpdateCommentRepositoryInterface } from '../../ports/repositories/comment/update-comment-repository-interface'
import {
  UpdateCommentServiceInterface,
  UpdateCommentServiceParams,
} from '../../interfaces/comment-interface/update-comment-service-interface'

export class UpdateCommentService implements UpdateCommentServiceInterface {
  constructor(
    private readonly commentRepository: UpdateCommentRepositoryInterface,
    private readonly userRepository: LoadUserByIdRepositoryInterface,
    private readonly postRepository: GetPostByIdRepositoryInterface,
  ) {}

  async updateComment(
    params: UpdateCommentServiceParams,
  ): Promise<CommentDbModel> {
    const { commentId, postId, userId, text } = params

    const userAlreadyExists = await this.userRepository.loadById(userId)
    if (!userAlreadyExists) throw new UserNotFoundError()

    const post = await this.postRepository.getPostById(postId)
    if (!post) throw new PostNotFoundError()

    const commentUpdated = await this.commentRepository.updateComment({
      text,
      commentId,
    })
    if (!commentUpdated) throw new CommentNotUpdatedError()

    return commentDto(commentUpdated)
  }
}
