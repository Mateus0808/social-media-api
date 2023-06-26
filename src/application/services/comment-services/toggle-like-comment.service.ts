import { ToggleLikeError } from './../../errors/toggle-like-error'
import { IToggleLikeCommentRepository } from './../../ports/repositories/comment/toggle-like-comment-repository.interface'
import { commentDto } from './../../helpers/comment-dto'
import { GetCommentByIdServiceInterface } from './../../interfaces/comment-interface/get-comment-by-id-service-interface'
import {
  ToggleLikeCommentServiceInterface,
  ToggleLikeCommentServiceParams,
  ToggleLikeCommentServiceResponse,
} from './../../interfaces/comment-interface/toggle-like-comment-service.interface'
import { GetPostByIdServiceInterface } from './../../interfaces/post-interface/get-post-by-service.interface'
import { GetUserByIdServiceInterface } from './../../interfaces/user-interface/get-user-by-id-service.interface'
import { LikePostRepositoryInterface } from './../../ports/repositories/post/like-post-repository.interface'

export class ToggleLikeCommentService
  implements ToggleLikeCommentServiceInterface
{
  constructor(
    private readonly userService: GetUserByIdServiceInterface,
    private readonly postService: GetPostByIdServiceInterface,
    private readonly commentService: GetCommentByIdServiceInterface,
    private readonly commentRepository: IToggleLikeCommentRepository,
  ) {}

  async toggleLike(
    params: ToggleLikeCommentServiceParams,
  ): Promise<ToggleLikeCommentServiceResponse> {
    const { postId, userId, commentId } = params

    await this.userService.getUserById({ userId })
    await this.postService.getPostById(postId)

    const comment = await this.commentService.getCommentById(commentId)

    let toggledLike

    const toggleParams = { commentId, userId }
    if (!comment.likes.some(like => like.toString() === userId)) {
      toggledLike = await this.commentRepository.likeComment(toggleParams)
    } else {
      toggledLike = await this.commentRepository.unlikeComment(toggleParams)
    }

    if (!toggledLike)
      throw new ToggleLikeError('Não foi possível curtir o comentário')
    return commentDto(toggledLike)
  }
}
