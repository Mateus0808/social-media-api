export interface CommentEntity {
  userId: string
  postId: string
  text: string
  likes: Array<string>
}
