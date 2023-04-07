import { CommentDbModel } from '../models/comment-model'

export interface LoadCommentsRepositoryParams {
  page: number | null
  limit: number | null
}

export interface LoadCommentsRepositoryResponse {
  comments: CommentDbModel[]
  pagination: any
}

export interface LoadCommentsRepositoryInterface {
  listComments: (
    loadCommentsRepositoryParams: LoadCommentsRepositoryParams,
  ) => Promise<LoadCommentsRepositoryResponse | null>
}
