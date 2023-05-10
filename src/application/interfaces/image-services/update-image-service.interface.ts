export interface UpdateImageServiceParams {
  key: string
  filename: string
  size: number
  url: string
}

export interface UpdateImageServiceResponse {
  id: string
  filename: string
  key: string
  size: number
  url: string
}

export interface IUpdateImageService {
  updateImage: (
    userId: string,
    imageParams: UpdateImageServiceParams,
  ) => Promise<UpdateImageServiceResponse>
}
