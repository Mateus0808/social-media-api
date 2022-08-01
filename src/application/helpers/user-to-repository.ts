import { ListUsersServiceParams } from '../interfaces/user-interface/list-users-service-interface'
import { LoadUsersRepositoryParams } from '../ports/repositories/user/load-users-repository-interface'

export const userToRepository = (
  params: ListUsersServiceParams,
): LoadUsersRepositoryParams => ({
  page: params.page ? Number(params.page) : null,
  limit: params.limit ? Number(params.limit) : null,
})
