import { CreatedPostModel } from '../../ports/repositories/models/post-model'
import { CreatePostRepositoryInterface } from '../../ports/repositories/post/create-post-repository-interface'
import {
  CreatePostParams,
  CreatePostServiceInterface,
} from '../../interfaces/post-interface/create-post-service-interface'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { PostNotCreatedError } from '../../errors/post-errors/post-not-created-error'
import { postCreatedDto } from '../../helpers/post-dto'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'

export class CreatePostService implements CreatePostServiceInterface {
  constructor(
    private readonly createPostRepository: CreatePostRepositoryInterface,
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
  ) {}

  async createPost(
    createPostParams: CreatePostParams,
  ): Promise<CreatedPostModel> {
    const { content, userId, title } = createPostParams

    const userExists = await this.loadUserByIdRepository.loadById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }
    const postCreated = await this.createPostRepository.createPost({
      title,
      content,
      user: userId,
    })

    if (!postCreated) {
      throw new PostNotCreatedError(title)
    }

    return postCreatedDto(postCreated)
  }
}
