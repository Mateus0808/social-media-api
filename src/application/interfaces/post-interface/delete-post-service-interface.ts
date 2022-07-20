export interface DeletePostServiceResponse {
  success: boolean,
  message: string
}

export interface DeletePostServiceInterface {
  deletePost: (id: string) => Promise<DeletePostServiceResponse>
}
