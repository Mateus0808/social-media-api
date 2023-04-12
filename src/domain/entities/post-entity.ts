import { UserDbModel } from '@application/ports/repositories/models/user-model'

export interface PostEntity {
  user: UserDbModel
  image: string
  caption: string
  likes: Array<string>
  comments: Array<string>
  shareCount: number
  shareUrl: string
  shareTitle: string
  shareDescription: string
  shareImage: string
}
