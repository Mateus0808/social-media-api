export interface DeleteCommentOnAPostParams {
  postId: string
  commentId: string
}

export interface DeleteCommentOnAPostRepositoryInterface {
  deleteCommentOnAPost(
    deleteCommentOnAPostParams: DeleteCommentOnAPostParams,
  ): Promise<boolean | null>
}
