import { UserDbModel } from '../models/user-model'

export interface LoadUserByEmailRepositoryInterface {
  loadByEmail: (email: string) => Promise<UserDbModel | null>
}
