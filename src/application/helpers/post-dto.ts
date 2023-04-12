import { PostDbModel } from '../ports/repositories/models/post-model'

import { LoadPostsRepositoryResponse } from '../ports/repositories/post/load-posts-repository-interface'
import { ListPostsServiceResponse } from '../interfaces/post-interface/list-post-service-interface'

export const postDto = (post: PostDbModel): PostDbModel => ({
  id: post.id,
  user: post.user,
  caption: post.caption,
  image: post.image,
  likes: post.likes,
  comments: post.comments,
  shareCount: post.shareCount,
  shareUrl: post.shareUrl,
  shareTitle: post.shareTitle,
  shareDescription: post.shareDescription,
  shareImage: post.shareImage,
  createdAt: new Date(post.createdAt),
  updatedAt: new Date(post.updatedAt),
})

export const postToPaginationDto = (
  param: LoadPostsRepositoryResponse,
): ListPostsServiceResponse => ({
  posts: param.posts.map(post => {
    return {
      id: post.id,
      user: post.user,
      caption: post.caption,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      shareCount: post.shareCount,
      shareUrl: post.shareUrl,
      shareTitle: post.shareTitle,
      shareDescription: post.shareDescription,
      shareImage: post.shareImage,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }
  }),
  pagination: param.pagination,
})
