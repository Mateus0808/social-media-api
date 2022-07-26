export interface DeleteCommentRepositoryInterface {
  deleteComment(commentId: string): Promise<boolean | null>
}
