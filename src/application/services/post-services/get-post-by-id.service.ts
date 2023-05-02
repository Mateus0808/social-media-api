import { postDto } from './../../helpers/post-dto'
import { PostNotFoundError } from './../../errors/post-errors/post-not-found-error'
import { GetPostByIdRepositoryInterface } from './../../ports/repositories/post/get-post-by-id-repository-interface'
import { PostDbModel } from '@application/ports/repositories/models/post-model'
import { GetPostByIdServiceInterface } from './../../interfaces/post-interface/get-post-by-service.interface'

export class GetPostByIdService implements GetPostByIdServiceInterface {
  constructor(
    private readonly postRepository: GetPostByIdRepositoryInterface,
  ) {}

  async getPostById(postId: string): Promise<PostDbModel> {
    const post = await this.postRepository.getPostById(postId)
    if (!post) throw new PostNotFoundError()

    return postDto(post)
  }
}
