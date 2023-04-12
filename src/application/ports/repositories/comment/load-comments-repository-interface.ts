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
    params: LoadCommentsRepositoryParams,
  ) => Promise<LoadCommentsRepositoryResponse | null>
}
