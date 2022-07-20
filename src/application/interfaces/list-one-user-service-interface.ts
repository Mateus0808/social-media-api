import { UserEntity } from '../../domain/entities/user-entity'

export interface ListOneUserResponse extends Omit<UserEntity, 'password'> {
  id: string
  registrationDate: Date
}

export interface ListOneUserServiceInterface {
  listOneUser: (id: string) => Promise<ListOneUserResponse>
}
