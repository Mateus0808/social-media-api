import { CommentDbModel } from '../../../../src/application/ports/repositories/models/comment-model'
import { CommentEntity } from '../../../../src/domain/entities/comment-entity'

export const fakeComment = (): CommentEntity => ({
  userId: 'any_comment_id',
  postId: 'any_post_id',
  comment: 'any_comment',
  likes: ['user1', 'user2'],
})

export const fakeDbComment = (): CommentDbModel => ({
  id: 'any_comment_id',
  userId: 'any_user_id',
  postId: 'any_post_id',
  comment: 'any_comment',
  likes: ['user1', 'user2'],
  createdAt: new Date('02/04/2023'),
  updatedAt: new Date('02/04/2023'),
})
