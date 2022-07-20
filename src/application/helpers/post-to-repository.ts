import { ListPostServiceParams } from './../interfaces/post-interface/list-post-service-interface';
import { LoadPostsRepositoryParams } from '../ports/repositories/post/load-posts-repository-interface';

export const postToRepository = (params: ListPostServiceParams): LoadPostsRepositoryParams => ({
  page: params.page ? Number(params.page) : null,
  limit: params.limit ? Number(params.limit) : null
})