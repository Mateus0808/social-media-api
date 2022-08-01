import { UserDbModel } from '../models/user-model'

export interface LoadUserByUsernameRepositoryInterface {
  loadUserByUsername(username: string): Promise<UserDbModel | null>
}
