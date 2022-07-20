import { LoadUserByIdRepositoryInterface } from '../../ports/repositories/user/load-user-by-id-repository-interface';
import { ListOneUserResponse, ListOneUserServiceInterface } from "../../interfaces/list-one-user-service-interface"
import { UsersNotFoundError } from '../../errors/user-not-found-error'
import { userDto } from '../../helpers/user-dto';

export class ListOneUserService implements ListOneUserServiceInterface {
  constructor (
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface
  ) {}

  public async listOneUser (id: string): Promise<ListOneUserResponse> {
    const user = await this.loadUserByIdRepository.loadById(id)
    
    if (!user) {
      throw new UsersNotFoundError()
    }
    return userDto(user)
  }
}