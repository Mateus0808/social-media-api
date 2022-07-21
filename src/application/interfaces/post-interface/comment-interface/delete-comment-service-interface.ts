export interface DeleteCommentParams {
  commentId: string
  postId: string
  userId: string
}

export interface DeleteCommentServiceResponse {
  message: string
  success: boolean
}

export interface DeleteCommentServiceInterface {
  deleteComment(
    deleteCommentParams: DeleteCommentParams,
  ): Promise<DeleteCommentServiceResponse>
}
