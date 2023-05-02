import { GetPostByIdServiceInterface } from './../../interfaces/post-interface/get-post-by-service.interface'
import { postDto } from './../../helpers/post-dto'
import { GetUserByIdServiceInterface } from './../../interfaces/user-interface/get-user-by-id-service.interface'
import { ToggleLikePostError } from './../../errors/post-errors/toggle-like-post-error'
import { LikePostRepositoryInterface } from './../../ports/repositories/post/like-post-repository.interface'
import { UnlikePostRepositoryInterface } from './../../ports/repositories/post/unlike-post-repository.interface'
import { PostDbModel } from './../../ports/repositories/models/post-model'
import {
  ToggleLikePostServiceInterface,
  ToggleLikeServiceParams,
} from './../../interfaces/post-interface/toggle-like-post-service.interface'

export class ToggleLikePostService implements ToggleLikePostServiceInterface {
  constructor(
    private readonly userService: GetUserByIdServiceInterface,
    private readonly postService: GetPostByIdServiceInterface,
    private readonly likePostRepository: LikePostRepositoryInterface,
    private readonly unlikePostRepository: UnlikePostRepositoryInterface,
  ) {}

  async toggleLike(params: ToggleLikeServiceParams): Promise<PostDbModel> {
    const { postId, userId } = params

    await this.userService.getUserById({ userId })
    const post = await this.postService.getPostById(postId)

    let toggledLike: PostDbModel | null

    if (!post.likes.some(like => like.toString() === userId)) {
      toggledLike = await this.likePostRepository.likePost({
        postId,
        userId,
      })
    } else {
      toggledLike = await this.unlikePostRepository.unlikePost({
        postId,
        userId,
      })
    }

    if (!toggledLike) throw new ToggleLikePostError()
    return postDto(toggledLike)
  }
}
