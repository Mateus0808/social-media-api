import { PostEntity } from "../../../../domain/entities/post-entity"

export interface PostDbModel extends PostEntity {
  id: string
  createdAt: Date
}