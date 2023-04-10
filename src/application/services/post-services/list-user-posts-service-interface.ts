import { ListUserPostsByIdRepositoryInterface } from '@application/ports/repositories/post/list-user-posts-by-id-repository'
import {
  ListUserPostsServiceInterface,
  ListUserPostsServiceParams,
  ListUserPostsServiceResponse,
} from '../../interfaces/post-interface/list-user-posts-service-interface'
import { LoadUserByIdRepositoryInterface } from '@application/ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '@application/errors/user-not-found-error'
import { postToRepository } from '@application/helpers/post-to-repository'
import { postToPaginationDto } from '@application/helpers/post-dto'

export class ListUserPostsService implements ListUserPostsServiceInterface {
  private readonly postRepository: ListUserPostsByIdRepositoryInterface

  private readonly userRepository: LoadUserByIdRepositoryInterface

  constructor(
    listUserPostsById: ListUserPostsByIdRepositoryInterface,
    loadUserById: LoadUserByIdRepositoryInterface,
  ) {
    this.postRepository = listUserPostsById
    this.userRepository = loadUserById
  }

  async listUserPosts(
    listUserPostsParams: ListUserPostsServiceParams,
  ): Promise<ListUserPostsServiceResponse> {
    const { limit, page, userId } = listUserPostsParams

    const user = await this.userRepository.loadById(userId)
    if (!user) throw new UserNotFoundError()

    const params = postToRepository({ page, limit })

    const userPosts = await this.postRepository.listUserPostsById({
      userId,
      ...params,
    })
    if (!userPosts) {
      return {
        posts: [],
        pagination: null,
      }
    }

    return postToPaginationDto(userPosts)
  }
}
