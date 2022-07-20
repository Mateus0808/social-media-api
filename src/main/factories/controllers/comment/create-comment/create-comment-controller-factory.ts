import { makeCommentValidator } from './create-comment-validator';
import { CreateCommentService } from '../../../../../application/services/post-services/comment-services/create-comment-service'
import { CommentRepository } from '../../../../../infra/mongodb/repositories/db-comment-repository'
import { CreateCommentController } from '../../../../../presentation/controllers/comment/create-comment-controller'
import { Controller } from '../../../../../presentation/interfaces/controller'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository';

export const makeCreateCommentControllerFactory = (): Controller => {
  const commentRepository = new CommentRepository()
  const postRepository = new PostRepository()
  const createCommentService = new CreateCommentService(commentRepository, postRepository)
  return new CreateCommentController(createCommentService, makeCommentValidator())
}
