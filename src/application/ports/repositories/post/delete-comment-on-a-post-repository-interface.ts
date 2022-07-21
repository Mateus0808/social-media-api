export interface DeleteCommentOnAPostParams {
  postId: string
  userId: string
}

export interface DeleteCommentOnAPostRepositoryInterface {
  deleteCommentOnAPost(
    deleteCommentOnAPostParams: DeleteCommentOnAPostParams,
  ): Promise<boolean | null>
}
