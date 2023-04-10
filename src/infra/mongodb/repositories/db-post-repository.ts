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

export class PostRepository
  implements
    CreatePostRepositoryInterface,
    LoadPostsRepositoryInterface,
    DeletePostRepositoryInterface,
    UpdatePostCommentsRepositoryInterface,
    DeleteCommentOnAPostRepositoryInterface,
    LoadPostsFromUserByIdRepositoryInterface,
    ListUserPostsByIdRepositoryInterface
{
  async createPost(
    createPostRepositoryParams: CreatePostRepositoryParams,
  ): Promise<PostDbModel | null> {
    const { title, content, user } = createPostRepositoryParams
    const postCreated = await PostModel.create({
      title,
      content,
      user,
    })
    if (!postCreated) {
      return null
    }
    return MongoHelper.mapToId(postCreated.toObject())
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
    )
    if (!post) return null

    return MongoHelper.mapToId(post.toObject())
  }

  async deleteCommentOnAPost(
    deleteCommentOnAPostParams: DeleteCommentOnAPostParams,
  ): Promise<boolean | null> {
    const { postId, userId } = deleteCommentOnAPostParams

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $pull: { comments: userId } },
      { new: true },
    )
    if (!post) return null

    return true
  }

  async loadPostsFromUserById(
    repositoryParams: LoadPostsFromUserByIdRepositoryParams,
  ): Promise<Array<PostDbModel> | null> {
    const { userId } = repositoryParams

    const posts = await PostModel.find({ user: userId })
    if (!posts) return null

    const postsArray = posts.map(post => MongoHelper.mapToId(post.toObject()))

    return postsArray
  }
}
