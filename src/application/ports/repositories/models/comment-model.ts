import { CommentEntity } from "../../../../domain/entities/comment-entity"

export interface CommentDbModel extends CommentEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}