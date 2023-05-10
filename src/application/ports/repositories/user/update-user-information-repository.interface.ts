import { UserDbModel } from '../models/user-model'

export interface UserParamsRepository {
  name?: string
  lastName?: string
  username?: string
  email?: string
  birthDate?: Date
  maritalStatus?: string
  phone?: string
  gender?: 'MALE' | 'FEMALE'
  followers?: Array<string>
  followings?: Array<string>
  password?: string
  profilePhoto?: string
  coverPhoto?: string
  status?: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  isPrivate?: boolean
}
export interface IUpdateUserInformationRepository {
  updateUserInfo(
    userId: string,
    params: UserParamsRepository,
  ): Promise<UserDbModel | null>
}
