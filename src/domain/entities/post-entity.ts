import { UserDbModel } from '../../application/ports/repositories/models/user-model'

export interface PostEntity {
  user: UserDbModel
  title: string
  content: string
  likes: Array<string>
  comments: Array<string>
}
