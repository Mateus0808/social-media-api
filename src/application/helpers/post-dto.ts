import { CreatedPostModel } from './../ports/repositories/models/post-model';
import { CreatePostResponse } from './../interfaces/post-interface/create-post-service-interface';
import { PostDbModel } from "../ports/repositories/models/post-model";
import { LoadPostsRepositoryResponse } from '../ports/repositories/post/load-posts-repository-interface';
import { ListPostsServiceResponse } from '../interfaces/post-interface/list-post-service-interface';
import { OnePostServiceResponse } from '../interfaces/post-interface/list-one-post-service-interface';

export const postCreatedDto = (postCreated: CreatedPostModel): CreatePostResponse => ({
  id: postCreated.id,
  title: postCreated.title,
  user: postCreated.user,
  content: postCreated.content,
  likes: postCreated.likes,
  comments: postCreated.comments,
  createdAt: new Date(postCreated.createdAt)
})

export const postDto = (post: PostDbModel): OnePostServiceResponse => ({
  id: post.id,
  title: post.title,
  user: post.user,
  content: post.content,
  likes: post.likes,
  comments: post.comments,
  createdAt: new Date(post.createdAt),
  updatedAt: new Date(post.updatedAt),
})

export const postToPaginationDto = (param: LoadPostsRepositoryResponse): ListPostsServiceResponse => ({
  posts: param.posts.map(post => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      user: post.user,
      likes: post.likes,
      comments: post.comments,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }
  }),
  pagination: param.pagination
})