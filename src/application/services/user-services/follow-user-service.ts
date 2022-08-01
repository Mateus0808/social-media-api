import { FollowingUserError } from '../../errors/following-user-error'
import { UserUpdateFollowError } from '../../errors/user-update-follow-error'
import { UserNotFoundError } from '../../errors/user-not-found-error'
import { UpdateFollowUserRepositoryInterface } from '../../ports/repositories/user/follow-user-repository-interface'
import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface'
import {
  FollowUserParams,
  FollowUserServiceInterface,
  FollowUserServiceResponse,
} from '../../interfaces/user-interface/follow-user-service-interface'

export class FollowUserService implements FollowUserServiceInterface {
  constructor(
    private readonly followUserRepository: UpdateFollowUserRepositoryInterface,
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
  ) {}

  async followUser(
    followUser: FollowUserParams,
  ): Promise<FollowUserServiceResponse> {
    const { currentUserId, userId } = followUser

    if (currentUserId === userId) throw new FollowingUserError()

    const currentUser = await this.loadUserByIdRepository.loadById(
      currentUserId,
    )
    if (!currentUser) throw new UserNotFoundError()

    const userIWillFollow = await this.loadUserByIdRepository.loadById(userId)
    if (!userIWillFollow) throw new UserNotFoundError()

    const response = await this.followUserRepository.updateFollowUser({
      currentUserId,
      userId,
    })

    if (!response) throw new UserUpdateFollowError()

    return {
      message: 'Usuário seguido com sucesso',
      success: true,
    }
  }
}
