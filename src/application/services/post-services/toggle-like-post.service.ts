import { IToggleLikePostRepository } from './../../ports/repositories/post/toggle-like-post-repository.interface'
import { ToggleLikeError } from './../../errors/toggle-like-error'
import { GetPostByIdServiceInterface } from './../../interfaces/post-interface/get-post-by-service.interface'
import { postDto } from './../../helpers/post-dto'
import { GetUserByIdServiceInterface } from './../../interfaces/user-interface/get-user-by-id-service.interface'
import { PostDbModel } from './../../ports/repositories/models/post-model'
import {
  ToggleLikePostServiceInterface,
  ToggleLikeServiceParams,
} from './../../interfaces/post-interface/toggle-like-post-service.interface'

export class ToggleLikePostService implements ToggleLikePostServiceInterface {
  constructor(
    private readonly userService: GetUserByIdServiceInterface,
    private readonly postService: GetPostByIdServiceInterface,
    private readonly postRepository: IToggleLikePostRepository,
  ) {}

  async toggleLike(params: ToggleLikeServiceParams): Promise<PostDbModel> {
    const { postId, userId } = params

    await this.userService.getUserById({ userId })
    const post = await this.postService.getPostById(postId)

    let toggledLike

    const toggleParams = { postId, userId }
    if (!post.likes.some(like => like.toString() === userId)) {
      toggledLike = await this.postRepository.likePost(toggleParams)
    } else {
      toggledLike = await this.postRepository.unlikePost(toggleParams)
    }

    if (!toggledLike)
      throw new ToggleLikeError('Não foi possível curtir a postagem')

    return postDto(toggledLike)
  }
}
