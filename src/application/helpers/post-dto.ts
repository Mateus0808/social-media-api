import { CreatedPostModel } from './../ports/repositories/models/post-model';
import { CreatePostResponse } from './../interfaces/post-interface/create-post-service-interface';
import { PostDbModel } from "../ports/repositories/models/post-model";
import { LoadPostsRepositoryResponse } from '../ports/repositories/post/load-posts-repository-interface';
import { ListPostsServiceResponse } from '../interfaces/post-interface/list-post-service-interface';

export const postCreatedDto = (postCreated: CreatedPostModel): CreatePostResponse => ({
  id: postCreated.id,
  title: postCreated.title,
  user: postCreated.user,
  content: postCreated.content,
  likes: postCreated.likes,
  comment: postCreated.comment,
  createdAt: new Date(postCreated.createdAt)
})

export const postToPaginationDto = (param: LoadPostsRepositoryResponse): ListPostsServiceResponse => ({
  posts: param.posts.map(post => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      user: post.user,
      likes: post.likes,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }
  }),
  pagination: param.pagination
})