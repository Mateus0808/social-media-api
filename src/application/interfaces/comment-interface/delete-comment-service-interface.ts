export interface DeleteCommentParams {
  commentId: string
  postId: string
  currentUserId: string
  userId: string
}

export interface DeleteCommentServiceResponse {
  message: string
  success: boolean
}

export interface DeleteCommentServiceInterface {
  deleteComment(
    params: DeleteCommentParams,
  ): Promise<DeleteCommentServiceResponse>
}
