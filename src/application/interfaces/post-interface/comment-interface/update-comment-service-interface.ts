export interface UpdateCommentServiceParams {
  commentId: string
  postId: string
  userId: string
  comment: string
}

export interface UpdateCommentServiceResponse {
  id: string
  user: string
  comment: string
  createdAt: Date
  updatedAt: Date
  likes: Array<string>
}

export interface UpdateCommentServiceInterface {
  updateComment: (
    commentParams: UpdateCommentServiceParams,
  ) => Promise<UpdateCommentServiceResponse>
}
