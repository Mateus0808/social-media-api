import { UserEntity } from '../../../domain/entities/user-entity'

export interface ListOneUserParams {
  userId: string
}

export interface ListOneUserResponse extends Omit<UserEntity, 'password'> {
  id: string
  registrationDate: Date
}

export interface ListOneUserServiceInterface {
  listOneUser: (
    listOneUserParams: ListOneUserParams,
  ) => Promise<ListOneUserResponse>
}
