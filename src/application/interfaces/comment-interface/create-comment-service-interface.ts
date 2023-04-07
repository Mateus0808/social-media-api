export interface CreateCommentParams {
  userId: string
  postId: string
  currentUserId: string
  comment: string
}

export interface CreateCommentResponse {
  id: string
  user: string
  post: string
  comment: string
  likes: Array<string>
  createdAt: Date
}

export interface CreateCommentServiceInterface {
  createComment: (
    createCommentParams: CreateCommentParams,
  ) => Promise<CreateCommentResponse>
}
