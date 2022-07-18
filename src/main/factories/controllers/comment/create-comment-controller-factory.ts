import { makeCommentValidator } from './create-comment-validator';
import { CreateCommentService } from '../../../../application/services/comment-serivces/create-comment-service'
import { CommentRepository } from '../../../../infra/mongodb/repositories/db-comment-repository'
import { CreateCommentController } from '../../../../presentation/controllers/comment/create-comment-controller'
import { Controller } from '../../../../presentation/interfaces/controller'

export const makeCreateCommentControllerFactory = (): Controller => {
  const commentRepository = new CommentRepository()
  const createCommentService = new CreateCommentService(commentRepository)
  return new CreateCommentController(createCommentService, makeCommentValidator())
}
