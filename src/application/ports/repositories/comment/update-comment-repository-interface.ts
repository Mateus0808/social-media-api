export interface UpdateCommentRepositoryParams {
  commentId: string
  comment: string
}

export interface UpdateCommentRepositoryResponse {
  comment: string
  createdAt: Date
  id: string
  likes: Array<string>
  updatedAt: Date
  user: string
}

export interface UpdateCommentRepositoryInterface {
  updateComment: (
    commentParams: UpdateCommentRepositoryParams,
  ) => Promise<UpdateCommentRepositoryResponse | null>
}
