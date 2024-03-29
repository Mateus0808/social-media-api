import { UserDbModel } from '../../ports/repositories/models/user-model'

export interface OnePostServiceResponse {
  id: string
  title: string
  content: string
  likes: Array<string>
  comments: Array<string>
  user: UserDbModel
  createdAt: Date
  updatedAt: Date
}

export interface ListOnePostServiceInterface {
  listOnePost: (id: string) => Promise<OnePostServiceResponse>
}
