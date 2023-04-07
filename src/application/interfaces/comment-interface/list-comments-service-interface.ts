export interface ListCommentsServiceParams {
  page: string | null
  limit: string | null
}

interface CommentServiceResponse {
  id: string
  comment: string
  likes: Array<string>
  user: string
  post: string
  createdAt: Date
  updatedAt: Date
}

export interface ListCommentsServiceResponse {
  comments: CommentServiceResponse[]
  pagination: any
}

export interface ListCommentsServiceInterface {
  listComments: (
    listCommentsServiceParams: ListCommentsServiceParams,
  ) => Promise<ListCommentsServiceResponse>
}
