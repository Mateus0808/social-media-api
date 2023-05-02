export interface CommentEntity {
  userId: string
  postId: string
  comment: string
  likes: Array<string>
}
