import { UserDbModel } from '../models/user-model'

export interface LoadUserByIdRepositoryInterface {
  loadById: (id: string) => Promise<UserDbModel | null>
}
