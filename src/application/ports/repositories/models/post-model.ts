import { PostEntity } from "../../../../domain/entities/post-entity"

export interface CreatedPostModel extends PostEntity {
  id: string
  createdAt: Date
}

export interface PostDbModel extends PostEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
