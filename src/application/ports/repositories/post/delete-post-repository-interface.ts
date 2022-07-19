export interface DeletePostRepositoryInterface {
  deletePost(id: string): Promise<boolean>
}