import { postToRepository } from '../../helpers/post-to-repository'
import {
  ListPostsServiceInterface,
  ListPostServiceParams,
  ListPostsServiceResponse,
} from '../../interfaces/post-interface/list-post-service-interface'
import { LoadPostsRepositoryInterface } from '../../ports/repositories/post/load-posts-repository-interface'
import { PostNotFoundError } from '../../errors/post-errors/post-not-found-error'
import { postToPaginationDto } from '../../helpers/post-dto'

export class ListPostsService implements ListPostsServiceInterface {
  private readonly loadPostsRepository: LoadPostsRepositoryInterface

  constructor(loadPostsRepository: LoadPostsRepositoryInterface) {
    this.loadPostsRepository = loadPostsRepository
  }

  public async listPosts(
    listPostServiceParams: ListPostServiceParams,
  ): Promise<ListPostsServiceResponse> {
    const { page, limit } = listPostServiceParams
    const param = postToRepository({ page, limit })

    const posts = await this.loadPostsRepository.loadPosts(param)
    if (!posts) {
      throw new PostNotFoundError()
    }

    return postToPaginationDto(posts)
  }
}
