import { UsersNotFoundError } from "../../errors/user-not-found-error";
import { userToPaginationDto } from "../../helpers/user-dto";
import { userToRepository } from "../../helpers/user-to-repository";
import { ListUsersServiceInterface, ListUsersServiceParams, ListUsersServiceResponse } from "../../interfaces/list-users-service-interface";
import { LoadUsersRepositoryInterface } from "../../ports/repositories/user/load-users-repository-interface";

export class ListUsersService implements ListUsersServiceInterface {
  constructor (private readonly loadUsersRepository: LoadUsersRepositoryInterface) {}

  async listUsers (listUsersServiceParams: ListUsersServiceParams): Promise<ListUsersServiceResponse> {
    const params = userToRepository(listUsersServiceParams)
    const response = await this.loadUsersRepository.loadUsers(params)
    if (response === null) {
      throw new UsersNotFoundError()
    }

    return userToPaginationDto(response)
  }
  
}