import { CommentDbModel } from './../../ports/repositories/models/comment-model'

export interface ListCommentsServiceParams {
  page: string | null
  limit: string | null
}

export interface ListCommentsServiceResponse {
  comments: CommentDbModel[]
  pagination: any
}

export interface ListCommentsServiceInterface {
  listComments: (
    params: ListCommentsServiceParams,
  ) => Promise<ListCommentsServiceResponse>
}
