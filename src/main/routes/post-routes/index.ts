import { expressRouterAdapter } from './../../adapters/express-route-adapter';
import { Router } from 'express';
import { makeCreatePostControllerFactory } from '../../factories/controllers/post/create-post/create-post-controller-factory';
import { makeListPostsControllerFactory } from '../../factories/controllers/post/list-post-controller-factory';
import { makeDeletePostControllerFactory } from '../../factories/controllers/post/delete-post/delete-post-controller-factory';

export const postRoutes = (router: Router): void => {
  router.post('/post/register/:userId', expressRouterAdapter(makeCreatePostControllerFactory()));
  router.get('/posts', expressRouterAdapter(makeListPostsControllerFactory()));
  router.delete('/post/:postId', expressRouterAdapter(makeDeletePostControllerFactory()));
}