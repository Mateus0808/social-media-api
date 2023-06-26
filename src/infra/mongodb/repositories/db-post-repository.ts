import {
  LoadPostsFromUserByIdRepositoryInterface,
  LoadPostsFromUserByIdRepositoryParams,
} from '../../../application/ports/repositories/post/load-posts-user-timeline-repository-interface'
import {
  DeleteCommentOnAPostParams,
  DeleteCommentOnAPostRepositoryInterface,
} from '../../../application/ports/repositories/post/delete-comment-on-a-post-repository-interface'
import {
  UpdatePostCommentsRepositoryResponse,
  UpdatePostCommentsRepositoryInterface,
  UpdatePostCommentsRepositoryParams,
} from '../../../application/ports/repositories/post/update-post-comments-repository-interface'
import {
  LoadPostsRepositoryInterface,
  LoadPostsRepositoryParams,
  LoadPostsRepositoryResponse,
} from '../../../application/ports/repositories/post/load-posts-repository-interface'
import { PostDbModel } from '../../../application/ports/repositories/models/post-model'
import {
  CreatePostRepositoryInterface,
  CreatePostRepositoryParams,
} from '../../../application/ports/repositories/post/create-post-repository-interface'
import { PostModel } from '../models/post-model'
import { MongoHelper } from '../helpers/mongo-helper'
import { DeletePostRepositoryInterface } from '../../../application/ports/repositories/post/delete-post-repository-interface'
import {
  ListUserPostsByIdRepositoryInterface,
  ListUserPostsByIdRepositoryParams,
  ListUserPostsByIdRepositoryResponse,
} from '@application/ports/repositories/post/list-user-posts-by-id-repository'
import { GetPostByIdRepositoryInterface } from '@application/ports/repositories/post/get-post-by-id-repository-interface'
import {
  LikePostRepositoryInterface,
  LikePostRepositoryParams,
} from '@application/ports/repositories/post/like-post-repository.interface'
import {
  UnlikePostRepositoryInterface,
  UnlikePostRepositoryParams,
} from '@application/ports/repositories/post/unlike-post-repository.interface'

export class PostRepository
  implements
    CreatePostRepositoryInterface,
    LoadPostsRepositoryInterface,
    DeletePostRepositoryInterface,
    UpdatePostCommentsRepositoryInterface,
    DeleteCommentOnAPostRepositoryInterface,
    LoadPostsFromUserByIdRepositoryInterface,
    ListUserPostsByIdRepositoryInterface,
    GetPostByIdRepositoryInterface,
    LikePostRepositoryInterface,
    UnlikePostRepositoryInterface
{
  async createPost(
    params: CreatePostRepositoryParams,
  ): Promise<PostDbModel | null> {
    const postCreated = await PostModel.create({
      ...params,
    })
    if (!postCreated) {
      return null
    }
    return MongoHelper.mapToId(postCreated.toObject())
  }

  async getPostById(postId: string): Promise<PostDbModel | null> {
    const post = await PostModel.findById(postId)

    if (!post) return null

    return MongoHelper.mapToId(post.toObject())
  }

  async loadPosts(
    loadPostsRepositoryParams: LoadPostsRepositoryParams,
  ): Promise<LoadPostsRepositoryResponse | null> {
    const { page, limit } = loadPostsRepositoryParams

    const posts = await PostModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10,
      populate: 'comments',
    })

    if (!posts) return null

    const { docs, ...restPostsProps } = posts
    const postsArray = docs.map(post => MongoHelper.mapToId(post))

    const response: LoadPostsRepositoryResponse = {
      posts: postsArray,
      pagination: { ...restPostsProps },
    }
    return response
  }

  async listUserPostsById(
    params: ListUserPostsByIdRepositoryParams,
  ): Promise<ListUserPostsByIdRepositoryResponse | null> {
    const { page, limit, userId } = params

    const posts = await PostModel.paginate({
      page: page ?? 1,
      limit: limit ?? 10,
      populate: 'comments',
      query: {
        user: userId,
      },
    })

    if (!posts) return null

    const { docs, ...restPostsProps } = posts
    const postsArray = docs.map(post => MongoHelper.mapToId(post))

    const response: LoadPostsRepositoryResponse = {
      posts: postsArray,
      pagination: { ...restPostsProps },
    }
    return response
  }

  async deletePost(id: string): Promise<boolean> {
    const postDeleted = await PostModel.findByIdAndDelete(id)

    if (!postDeleted) {
      return false
    }

    return true
  }

  async updatePostComments(
    updatePostCommentsParams: UpdatePostCommentsRepositoryParams,
  ): Promise<UpdatePostCommentsRepositoryResponse | null> {
    const { postId, commentId } = updatePostCommentsParams

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $push: { comments: commentId } },
      { new: true },
    ).populate('comments')
    if (!post) return null

    return MongoHelper.mapToId(post.toObject())
  }

  async deleteCommentOnAPost(
    deleteCommentOnAPostParams: DeleteCommentOnAPostParams,
  ): Promise<boolean | null> {
    const { postId, commentId } = deleteCommentOnAPostParams

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { comments: commentId } },
      { new: true },
    )
    console.log('delete comment on post', post)
    if (!post) return null

    return true
  }

  async loadPostsFromUserById(
    repositoryParams: LoadPostsFromUserByIdRepositoryParams,
  ): Promise<Array<PostDbModel> | null> {
    const { userId } = repositoryParams

    const posts = await PostModel.find({ user: userId })
      .sort({ updatedAt: 'descending' })
      .populate('comments')
      .populate('user')

    if (!posts) return null

    const postsArray = posts.map(post => MongoHelper.mapToId(post.toObject()))

    return postsArray
  }

  async likePost(
    params: LikePostRepositoryParams,
  ): Promise<PostDbModel | null> {
    const { postId, userId } = params

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true },
    )
      .populate('comments')
      .populate('user')
    if (!post) return null

    return MongoHelper.mapToId(post.toObject())
  }

  async unlikePost(
    params: UnlikePostRepositoryParams,
  ): Promise<PostDbModel | null> {
    const { postId, userId } = params

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true },
    )
      .populate('comments')
      .populate('user')
    if (!post) return null

    return MongoHelper.mapToId(post.toObject())
  }
}
