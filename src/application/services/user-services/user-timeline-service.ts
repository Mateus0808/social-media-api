import { postToPaginationDto } from '../../helpers/post-dto'
import { PostNotFoundError } from '../../errors/post-errors/post-not-found-error'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import {
  UserTimelineServiceResponse,
  UserTimelineParams,
  UserTimelineServiceInterface,
} from '../../interfaces/user-interface/user-timeline-service-interface'
import { LoadPostsFromUserByIdRepositoryInterface } from '../../ports/repositories/post/load-posts-user-timeline-repository-interface'

export class UserTimelineService implements UserTimelineServiceInterface {
  constructor(
    private readonly userRepository: LoadUserByIdRepositoryInterface,
    private readonly loadPostsFromUserByIdRepository: LoadPostsFromUserByIdRepositoryInterface,
  ) {}

  async userTimeline(
    params: UserTimelineParams,
  ): Promise<UserTimelineServiceResponse> {
    const { userId } = params

    const user = await this.userRepository.loadById(userId)
    if (!user) throw new UserNotFoundError()

    const userPosts =
      await this.loadPostsFromUserByIdRepository.loadPostsFromUserById({
        userId,
      })
    if (!userPosts) throw new PostNotFoundError()

    const friendPosts = await Promise.all(
      user.followings.map(friendId => {
        return this.loadPostsFromUserByIdRepository.loadPostsFromUserById({
          userId: friendId,
        })
      }),
    )
    if (!friendPosts) throw new PostNotFoundError()

    const posts = [...userPosts, ...(friendPosts[0] || [])]

    return postToPaginationDto({ posts, pagination: {} })
  }
}
