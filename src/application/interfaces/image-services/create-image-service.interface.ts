export interface CreateImageServiceParams {
  filename: string
  key: string
  size: number
  url: string
}

export interface CreateImageServiceResponse {
  id: string
  filename: string
  key: string
  size: number
  url: string
}

export interface ICreateImageService {
  createImage: (
    params: CreateImageServiceParams,
  ) => Promise<CreateImageServiceResponse>
}
