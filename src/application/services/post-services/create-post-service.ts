import { LoadUserByEmailRepositoryInterface } from './../../ports/repositories/user/load-user-by-email-repository-interface';
import { CreatePostRepositoryInterface } from './../../ports/repositories/post/create-post-repository-interface';
import { CreatePostParams, CreatePostServiceInterface } from './../../interfaces/post-interface/create-post-service-interface';
import { PostDbModel } from '../../ports/repositories/models/post-model';
import { UsersNotFoundError } from '../../errors/user-not-found-error';
import { PostNotCreatedError } from '../../errors/post-errors/post-not-created-error';
import { postCreatedDto } from '../../helpers/post-dto';
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface';

export class CreatePostService implements CreatePostServiceInterface {
  constructor(
    private readonly createPostRepository: CreatePostRepositoryInterface,
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface
  ) {}

  async createPost(createPostParams: CreatePostParams): Promise<PostDbModel> {
    const { content, userId, title } = createPostParams;

    const userExists = await this.loadUserByIdRepository.loadById(userId);

    if (!userExists) {
      throw new UsersNotFoundError()
    }
    const postCreated = await this.createPostRepository.createPost({
      title, content, user: userId
    })

    if (!postCreated) {
      throw new PostNotCreatedError(title)
    }

    return postCreatedDto(postCreated)
  }
}