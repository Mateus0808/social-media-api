import { CreatePostController } from './../../../../../presentation/controllers/post/create-post-controller';
import { UserRepository } from './../../../../../infra/mongodb/repositories/db-user-repository';
import { CreatePostService } from '../../../../../application/services/post-services/create-post-service';
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository';
import { Controller } from './../../../../../presentation/interfaces/controller';
import { makePostValidator } from './create-post-validator';

export const makeCreatePostControllerFactory = (): Controller => {
  const postRepository = new PostRepository()
  const loadUserByIdRepository = new UserRepository()
  const createPostService = new CreatePostService(postRepository, loadUserByIdRepository)
  return new CreatePostController(createPostService, makePostValidator())
}