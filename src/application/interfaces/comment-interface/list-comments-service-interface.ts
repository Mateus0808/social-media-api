import { UserDbModel } from "../../ports/repositories/models/user-model"

export interface ListCommentsServiceParams {
  page: string | null
  limit: string | null
}

export interface ListCommentsServiceResponse {
  comments: CommentServiceResponse[]
  pagination: any
}

interface CommentServiceResponse {
  id: string
  comment: string
  totalLikes: number
  post: string
  user: UserDbModel
  createdAt: Date
  updatedAt: Date
}

export interface ListCommentsServiceInterface {
  listComments: (listCommentsServiceParams: ListCommentsServiceParams) => Promise<ListCommentsServiceResponse>
}